import { getFormNumber, getPaginatedMarriageCertificates, getSingleMarriageCertificate, insertData } from "../models/marriageCertModel.js";

// Helper function to get file path
const getFilePath = (files, key) => files[key] ? files[key][0].path : null;

// register marriage certificate
export const registerMarriageCert = async (req, res) => {
    console.log('Marriage Cert Registering...');
    try {
        // Extract file paths
        const fileKeys = ['eighteenHusbandSignature', 'eighteenWifeSignature', 'nineTeenSignature', 'twentySignatureOne', 'twentySignatureTwo', 'twentySignatureThree', 'twentySignatureFour', 'twentyOneSignature', 'twentyTwoSignature'];
        const filePaths = fileKeys.reduce((acc, key) => {
            acc[key] = getFilePath(req.files, key);
            return acc;
        }, {});

        // Create certData object using spread operator
        const certData = {
            ...req.body,
            eighteenHusbandSignature: filePaths['eighteenHusbandSignature'],
            eighteenWifeSignature: filePaths['eighteenWifeSignature'],
            nineTeenSignature: filePaths['nineTeenSignature'],
            twentySignatureOne: filePaths['twentySignatureOne'],
            twentySignatureTwo: filePaths['twentySignatureTwo'],
            twentySignatureThree: filePaths['twentySignatureThree'],
            twentySignatureFour: filePaths['twentySignatureFour'],
            twentyOneSignature: filePaths['twentyOneSignature'],
            twentyTwoSignature: filePaths['twentyTwoSignature'],
        };

        await insertData(certData);
        return res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering marriage certificate.' });
    }
};


export const handleGetFormNumber = async (req, res) => {
    try {
        console.log('Handling form number request...');
        const formNumber = await getFormNumber();
        console.log('Form number:', formNumber);
    
        return res.status(200).json({ formNumber });
    } catch (error) {
        console.error('Error in handleGetFormNumber:', error);
        return res.status(500).json({ message: 'Error retrieving death certificate.' });
    }
};

// Controller to handle paginated request with search
export const handleGetPaginatedMarriageCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed

        const result = await getPaginatedMarriageCertificates(page, limit, searchTerm);

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
        const response = await getSingleMarriageCertificate(id);

            if(!response){
                return res.status(404).json('Marriage certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}