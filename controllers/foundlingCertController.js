import { getFormNumber, getPaginatedFoundlingCertificates, getSingleFoundlingCertificate, insertData } from "../models/foundlingsCertModel.js";

// Helper function to get file path
const getFilePath = (files, key) => files[key] ? files[key][0].path : null;

// register foundling certificate
export const registerFoundlingCert = async (req, res) => {
    try {
        // Extract file paths
        const fileKeys = ['twelveInformantSignature', 'twelveRegistrarSignature', 'thirteenSignature', 'scannedFile'];
        const filePaths = fileKeys.reduce((acc, key) => {
            acc[key] = getFilePath(req.files, key);
            return acc;
        }, {});

        // Create certData object using spread operator
        const certData = {
            ...req.body,
            twelveInformantSignature: filePaths['twelveInformantSignature'],
            twelveRegistrarSignature: filePaths['twelveRegistrarSignature'],
            thirteenSignature: filePaths['thirteenSignature'],
            scannedFile: filePaths['scannedFile']
        };

        await insertData(certData);
        return res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering foundling certificate.' });
    }
};

export const handleFormRegistryNumber = async (req, res) => {
    try {
        const registryNumber = await getFormNumber();
    
        return res.status(200).json({ registryNumber });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving foundling certificate.' });
    }
};

// Controller to handle paginated request with search
export const handleGetPaginatedFoundlingCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed

        const result = await getPaginatedFoundlingCertificates(page, limit, searchTerm);

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
        const response = await getSingleFoundlingCertificate(id);

            if(!response){
                return res.status(404).json('Foundling certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}