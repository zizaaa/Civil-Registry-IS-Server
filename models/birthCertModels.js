import db from '../config/db.js';

// register birth certificate
export const insertData = async (data) => {
    try {
        
        if(!data.registryNumber){
            return {
                error:true,
                message:'No Registry Number provided'
            };
        }

        const existingCert = await db('birthcertificate').where({ registryNumber: data.registryNumber }).first();

        if(existingCert){
            return {
                error:true,
                message:'Birth certificate already exists.'
            };;
        }

        return await db('birthcertificate').insert(data).returning('*');
    } catch (error) {
        console.error("Insert Data Error:", error);
        throw new Error("Failed to insert data into the database.");
    }
};


//get registry number based on ID
export const getRegistryNumber = async () => {
    const countResult = await db('birthcertificate').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedBirthCertificates = async (page, limit) => {
    const offset = (page - 1) * limit;
    let query = db('birthcertificate').select('*').limit(limit).offset(offset).where('archived', false).andWhere('deleted', false);;
    
    const result = await query;

    const totalCount = await db('birthcertificate').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

export const searchBirthCertQuery = async (search) => {
    if (!search) return []; // Handle empty search

    const searchTerms = search.split(' ').map(term => term.toLowerCase());

    let query = db('birthcertificate')
        .select('id', 'one_first', 'one_middle', 'one_last', 'registryNumber', 'scannedFile')
        .where('archived', false)
        .andWhere('deleted', false);

    query = query.andWhere(builder => {
        searchTerms.forEach(term => {
            builder.orWhereRaw('LOWER(one_last) LIKE ?', `%${term}%`)
                .orWhereRaw('LOWER(one_first) LIKE ?', `%${term}%`)
                .orWhereRaw('LOWER("registryNumber") LIKE ?', `%${term}%`);
        });
    });

    const result = await query;
    return result;
};


// get single certificate
export const getSingleBirthCertificate = (id) => {
    return db('birthcertificate').where({ id }).first();
}

export const deleteSingleBirthCert = (id) =>{
    return db('birthcertificate').delete('*').where({id})
}

export const updateBirthCert = async (birthCertId, updates) => {
    try {
        // Filter out null, undefined, and empty string values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        if (Object.keys(filteredUpdates).length === 0) {
            throw new Error("No fields provided for update");
        }

        await db('birthcertificate')
            .where({ id: birthCertId })
            .update(filteredUpdates);

        return { message: "Birth certificate updated successfully" };
    } catch (error) {
        throw new Error('Unable to update birth certificate');
    }
};