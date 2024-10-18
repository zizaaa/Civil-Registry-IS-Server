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

// Get paginated birth certificates
export const getPaginatedBirthCertificates = async (page, limit) => {
    const offset = (page - 1) * limit;
    const result = await db('birthcertificate')
        .select('*')
        .limit(limit)
        .offset(offset);
    
    const total = await db('birthcertificate').count('id as count');
    return {
        data: result,
        total: parseInt(total[0].count, 10),
    };
};

// get single certificate
export const getSingleBirthCertificate = (id) => {
    return db('birthcertificate').where({ id }).first();
}
