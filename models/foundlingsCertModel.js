import db from '../config/db.js'

// register foundlings cert
export const insertData = ( data ) =>{
    return db('foundlings_certificate').insert(data).returning('*');
}

//get form number based on ID
export const getFormNumber = async () => {
    const countResult = await db('foundlings_certificate').count('id as count'); // Assuming 'id' is the primary key

    const currentLength = parseInt(countResult[0].count, 10); // Get the current count and convert to a number
    return currentLength + 1; // Add 1 to represent the next entry
};

export const getPaginatedFoundlingCertificates = async (page, limit, search) => {
    const offset = (page - 1) * limit;
    let query = db('foundlings_certificate').select('*').limit(limit).offset(offset);
    console.log('searching...', search);

    if (search) {
        // Split search by spaces and convert each term to lowercase
        const searchTerms = search.split(' ').map(term => term.trim().toLowerCase());
        console.log('Search terms:', searchTerms);

        query = query.where(builder => {
            searchTerms.forEach(term => {
                builder.orWhere(function() {
                    // Perform a case-insensitive partial match using LOWER() or ILIKE for PostgreSQL
                    this.whereRaw('LOWER(one_name) LIKE ?', [`%${term}%`])
                        .orWhereRaw('LOWER("registryNumber") LIKE ?', [`%${term}%`]);
                });
            });
        });
    }

    console.log('Executing query:', query.toSQL().sql, query.toSQL().bindings); // Log the SQL query

    const result = await query;
    console.log('Query result:', result); // Log the result

    const totalCount = await db('foundlings_certificate').count('id as count');
    return {
        data: result,
        total: parseInt(totalCount[0].count, 10),
    };
};

// get single certificate
export const getSingleFoundlingCertificate = (id) => {
    return db('foundlings_certificate').where({ id }).first();
}