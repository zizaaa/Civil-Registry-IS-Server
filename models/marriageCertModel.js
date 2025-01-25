import db from '../config/db.js'

// register marriage cert
export const insertData = async( data ) =>{
    if(!data.RegistryNumber){
        return {
            error:true,
            message:'No Registry Number provided'
        };
    }

    const existingCert = await db('marriage_certificates').where({ RegistryNumber: data.RegistryNumber }).first();

    if(existingCert){
        return {
            error:true,
            message:'Marriage certificate already exists.'
        };;
    }
    return db('marriage_certificates').insert(data).returning('*');
}

//get form number based on ID
export const getFormNumber = async () => {
    const countResult = await db('marriage_certificates').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedMarriageCertificates = async (page, limit, search) => {
    const offset = (page - 1) * limit;
    let query = db('marriage_certificates').select('*').limit(limit).offset(offset);

    const result = await query;

    const totalCount = await db('marriage_certificates').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

export const searchMarriageCertQuery = async (search) =>{
    let query = db('marriage_certificates').select('id', 'one_first', 'one_middle', 'one_last', 'one_last_wife', 'one_first_wife','RegistryNumber', 'scannedFile');

    const searchTerms = search.split(' ').map(term => term.toLowerCase());

        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    this.whereRaw('LOWER(one_last) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER(one_first) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER(one_last_wife) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER(one_first_wife) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER("RegistryNumber") LIKE ?', [`%${term.toLowerCase()}%`]);
                });
            });
        });

    const result = await query;

    return result
}

// get single certificate
export const getSingleMarriageCertificate = (id) => {
    return db('marriage_certificates').where({ id }).first();
}

export const deleteSingleMarriageCert = (id) =>{
    return db('marriage_certificates').delete('*').where({id})
}

export const updateMarriageCert = async (marriage, updates) => {
    try {
        // Filter out null, undefined, and empty string values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        if (Object.keys(filteredUpdates).length === 0) {
            throw new Error("No fields provided for update");
        }

        await db('marriage_certificates')
            .where({ id: marriage })
            .update(filteredUpdates);

        return { message: "marriage certificate updated successfully" };
    } catch (error) {
        throw new Error('Unable to update marriage certificate');
    }
};