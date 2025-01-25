import db from '../config/db.js'

// register death cert
export const insertData = async( data ) =>{
    if(!data.registryNumber){
        return {
            error:true,
            message:'No Registry Number provided'
        };
    }

    const existingCert = await db('death_certificates').where({ registryNumber: data.registryNumber }).first();

    if(existingCert){
        return {
            error:true,
            message:'Death certificate already exists.'
        };;
    }
    return db('death_certificates').insert(data).returning('*');
}

//get form number based on ID
export const getFormNumber = async () => {
    const countResult = await db('death_certificates').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedDeathCertificates = async (page, limit) => {
    const offset = (page - 1) * limit;
    let query = db('death_certificates').select('*').limit(limit).offset(offset);

    const result = await query;

    const totalCount = await db('death_certificates').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

export const searchDeathCertQuery = async (search) =>{
    let query = db('death_certificates').select('id', 'one_first', 'one_middle', 'one_last', 'registryNumber', 'scannedFile')

    const searchTerms = search.split(' ').map(term => term.toLowerCase());
        
        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    this.whereRaw('LOWER(one_last) LIKE ?', `%${term}%`)
                        .orWhereRaw('LOWER(one_first) LIKE ?', `%${term}%`)
                        .orWhereRaw('LOWER("registryNumber") LIKE ?', `%${term}%`); // Use double quotes for case-sensitive column
                });
            });
        });

    const result = await query;

    return result
}

// get single certificate
export const getSingleDeathCertificate = (id) => {
    return db('death_certificates').where({ id }).first();
}

export const deleteSingleDeathCert = (id) =>{
    return db('death_certificates').delete('*').where({id})
}

export const updateDeathCert = async (deathCertId, updates) => {
    try {
        // Filter out null, undefined, and empty string values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        if (Object.keys(filteredUpdates).length === 0) {
            throw new Error("No fields provided for update");
        }

        await db('death_certificates')
            .where({ id: deathCertId })
            .update(filteredUpdates);

        return { message: "Death certificate updated successfully" };
    } catch (error) {
        throw new Error('Unable to update birth certificate');
    }
};