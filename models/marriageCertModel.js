import db from '../config/db.js'

// register marriage cert
export const insertData = ( data ) =>{
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
    console.log('searching...', search);
    
    if (search) {
        const searchTerms = search.split(' ').map(term => term.toLowerCase());
        console.log('Search terms:', searchTerms);
        
        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    this.whereRaw('LOWER(one_last_wife) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER(one_last) LIKE ?', [`%${term.toLowerCase()}%`])
                        .orWhereRaw('LOWER("RegistryNumber") LIKE ?', [`%${term.toLowerCase()}%`]);
                });
            });
        });
    }

    console.log('Executing query:', query.toSQL().sql, query.toSQL().bindings); // Log the SQL query

    const result = await query;
    console.log('Query result:', result); // Log the result

    const totalCount = await db('marriage_certificates').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

// get single certificate
export const getSingleMarriageCertificate = (id) => {
    return db('marriage_certificates').where({ id }).first();
}