import db from '../config/db.js';

// register birth certificate
export const insertData = async (data) => {
    try {
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
    let query = db('birthcertificate').select('*').limit(limit).offset(offset);
    
    const result = await query;

    const totalCount = await db('birthcertificate').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

export const searchBirthCertQuery = async (search) =>{
    let query = db('birthcertificate').select('id', 'one_first', 'one_middle', 'one_last', 'registryNumber', 'scannedFile');

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
export const getSingleBirthCertificate = (id) => {
    return db('birthcertificate').where({ id }).first();
}

export const deleteSingleBirthCert = (id) =>{
    return db('birthcertificate').delete('*').where({id})
}