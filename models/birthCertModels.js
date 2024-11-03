import db from '../config/db.js';

// register birth certificate
export const insertData = (data) =>{
    return db('birthcertificate').insert(data).returning('*');
}

//get registry number based on ID
export const getRegistryNumber = async () => {
    const countResult = await db('birthcertificate').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedBirthCertificates = async (page, limit, search) => {
    const offset = (page - 1) * limit;
    let query = db('birthcertificate').select('*').limit(limit).offset(offset);
    
    if (search) {
        const searchTerms = search.split(' ').map(term => term.toLowerCase());
        
        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    this.whereRaw('LOWER(one_last) LIKE ?', `%${term}%`)
                        .orWhereRaw('LOWER("registryNumber") LIKE ?', `%${term}%`); // Use double quotes for case-sensitive column
                });
            });
        });
    }

    const result = await query;

    const totalCount = await db('birthcertificate').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

// get single certificate
export const getSingleBirthCertificate = (id) => {
    return db('birthcertificate').where({ id }).first();
}
