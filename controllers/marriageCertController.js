import { deleteSingleMarriageCert, getFormNumber, getPaginatedMarriageCertificates, getSingleMarriageCertificate, insertData, searchMarriageCertQuery, updateMarriageCert } from "../models/marriageCertModel.js";

// Helper function to get file path
const getFilePath = (files, key) => files[key] ? files[key][0].path : null;

// register marriage certificate
export const registerMarriageCert = async (req, res) => {
    try {
        // Extract file paths
        const fileKeys = ['eighteenHusbandSignature', 'eighteenWifeSignature', 'nineTeenSignature', 'twentySignatureOne', 'twentySignatureTwo', 'twentySignatureThree', 'twentySignatureFour', 'twentyOneSignature', 'twentyTwoSignature', 'scannedFile'];
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
            scannedFile: filePaths['scannedFile']
        };

        await insertData(certData);
        return res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering marriage certificate.' });
    }
};


export const handleGetFormNumber = async (req, res) => {
    try {
        const formNumber = await getFormNumber();
    
        return res.status(200).json({ formNumber });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving death certificate.' });
    }
};

// Controller to handle paginated request with search
export const handleGetPaginatedMarriageCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        
        const result = await getPaginatedMarriageCertificates(page, limit);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const searchMarriageCertificate = async(req,res) => {
    try {
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed
        console.log(searchTerm)
        const result = await searchMarriageCertQuery(searchTerm);

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching marriage certidficate data.' });
    }
}

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

export const handleDeleteSingleMarriageCert = async(req,res)=>{
    try {
        const { id } = req.body;

        await deleteSingleMarriageCert(id);

        return res.status(200).json({message:"Certificate successfully deleted"})
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching birth certidficate data.' });
    }
}

export const handleUpdateMarriageCert = async(req,res) =>{
    const { id } = req.params;
    const { formData } = req.body;

    try {
        if(!id){
            return res.status(400).json({ error: "ID is required" });
        }
        console.log(id)
        console.log(formData)
        await updateMarriageCert(id, formData);

        return res.status(200).json({message:'mnarriage certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}

export const handleUpdateMarriageCertFile = async(req,res) =>{
    const { id } = req.params;

    try {
        if(!id){
            return res.status(400).json({ error: "ID is required" });
        }
        // Access file and other fields
        const scannedFile = req.file; // The uploaded file
        const fields = req.body; // The other fields in FormData

        let formData;

        if(scannedFile && scannedFile.path){
            formData = {
                ...fields,
                scannedFile:scannedFile.path
            }
        }else{
            formData = {...fields};
        }
        
        await updateMarriageCert(id, formData);

        return res.status(200).json({message:'Birth certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}