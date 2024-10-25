import db from '../config/db.js'

// register death cert
export const insertData = ( data ) =>{
    return db('death_certificates').insert(data).returning('*');
}

//get form number based on ID
export const getFormNumber = async () => {
    const countResult = await db('death_certificates').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedDeathCertificates = async (page, limit, search) => {
    const offset = (page - 1) * limit;
    let query = db('death_certificates').select('*').limit(limit).offset(offset);
    console.log('searching...', search);
    
    if (search) {
        const searchTerms = search.split(' ').map(term => term.toLowerCase());
        console.log('Search terms:', searchTerms);
        
        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    this.whereRaw('LOWER(one_last) LIKE ?', `%${term}%`)
                        .orWhereRaw('LOWER("registryNumber") LIKE ?', `%${term}%`); // Use double quotes for case-sensitive column
                });
            });
        });
    }

    console.log('Executing query:', query.toSQL().sql, query.toSQL().bindings); // Log the SQL query

    const result = await query;
    console.log('Query result:', result); // Log the result

    const totalCount = await db('death_certificates').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

// get single certificate
export const getSingleDeathCertificate = (id) => {
    return db('death_certificates').where({ id }).first();
}