import db from "../config/db.js";

export const archiveData = async (data) =>{
    try {
        if(!data){
            return {
                error:true,
                message:'No data provided'
            };
        }

        const certResult = await db(data.type).where({id: data.certificate_id}).update({archived: true});

        if(certResult){
            try {
                return await db('archive').insert(data).returning('*');
            } catch (error) {
                await db(data.type).where({id: data.certificate_id}).update({archived: false});
                console.error(error);
                return {
                    error:true,
                    message:'Error archiving certificate'
                };
            }
        }

        return {
            error:true,
            message:'Certificate not found'
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to insert data into the database.");
    }
}

export const getPaginatedArchivedCertificates = async (page, limit) => {
    const offset = (page - 1) * limit;

    // Fetch records with the type column
    const archives = await db('archive')
        .select('*')
        .limit(limit)
        .offset(offset);

    const joinedData = await Promise.all(
        archives.map(async (archive) => {
            if (archive.type) {
                const additionalData = await db(archive.type) // Use the value of `archive.type` as the table name
                    .select('*')
                    .where('id', archive.certificate_id)
                    .first();
                return { ...archive, additionalData };
            }
            return archive;
        })
    );

    const totalCount = await db('archive')
        .count('id as count')
        .first();

    return {
        data: joinedData,
        total: totalCount.count || 0,
    };
};

export const unArchive = async (data) =>{
    try {
        const certificate = await db(data.type).where({id: data.certificate_id}).update({archived: false});

            if(!certificate){
                return {
                    error:true,
                    message:'Certificate not found'
                };
            }
        
        return await db('archive').where({id: data.id}).del();
    } catch (error) {
        console.error(error);
        throw new Error("Failed to insert data into the database.");
    }
}
