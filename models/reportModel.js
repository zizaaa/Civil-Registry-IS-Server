import db from "../config/db.js";
// Function to get the counts of each table
export const getCertificateCounts = async () => {
    try {
        // Get the counts of each table
        const birthCertificateCount = await db('birthcertificate').count('* as count').first();
        const deathCertificateCount = await db('death_certificates').count('* as count').first();
        const marriageCertificateCount = await db('marriage_certificates').count('* as count').first();
        const foundlingCertificateCount = await db('foundlings_certificate').count('* as count').first();
        // Return the counts as an object
        return {
            birthCertificates: parseInt(birthCertificateCount.count, 10),
            deathCertificates: parseInt(deathCertificateCount.count, 10),
            marriageCertificates: parseInt(marriageCertificateCount.count, 10),
            foundlingCertificate: parseInt(foundlingCertificateCount.count, 10),
        };
    } catch (error) {
        console.error('Error fetching certificate counts:', error);
        throw new Error('Unable to fetch certificate counts');
    }
};
