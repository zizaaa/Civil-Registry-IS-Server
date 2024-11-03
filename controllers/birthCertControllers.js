import { getPaginatedBirthCertificates, getRegistryNumber, getSingleBirthCertificate, insertData } from "../models/birthCertModels.js";

// Helper function to get file path
const getFilePath = (files, key) => files[key] ? files[key][0].path : null;

// register birth certificate
export const registerBirthCert = async (req, res) => {
    try {
        // Extract file paths
        const fileKeys = ['nineteenB_Signature', 'twenty_Signature', 'twentyOne_Signature', 'twentyTwo_Signature', 'scannedFile'];
        const filePaths = fileKeys.reduce((acc, key) => {
            acc[key] = getFilePath(req.files, key);
            return acc;
        }, {});

        // Create certData object using spread operator
        const certData = {
            ...req.body,
            nineteenB_Signature: filePaths['nineteenB_Signature'],
            twenty_Signature: filePaths['twenty_Signature'],
            twentyOne_Signature: filePaths['twentyOne_Signature'],
            twentyTwo_Signature: filePaths['twentyTwo_Signature'],
            scannedFile: filePaths['scannedFile']
        };

        await insertData(certData);
        return res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering birth certificate.' });
    }
};

export const handleGetRegistryNumber = async (req, res) => {
    try {
        const registryNumber = await getRegistryNumber();
    
        return res.status(200).json({ registryNumber });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving birth certificate.' });
    }
};

// Controller to handle paginated request with search
export const handleGetPaginatedBirthCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed

        const result = await getPaginatedBirthCertificates(page, limit, searchTerm);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const handleGetSingleCertificate = async (req,res) => {
    const { id } = req.query;

    if(!id){
        return res.status(403).json({message:'Invalid ID'});
    }
    try {
        const response = await getSingleBirthCertificate(id);

            if(!response){
                return res.status(404).json('Birth certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}