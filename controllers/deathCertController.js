import { deleteSingleDeathCert, getFormNumber, getPaginatedDeathCertificates, getSingleDeathCertificate, insertData, searchDeathCertQuery, updateDeathCert } from "../models/deathCertModels.js";

// Helper function to get file path
const getFilePath = (files, key) => files[key] ? files[key][0].path : null;

// register death certificate
export const registerDeathCert = async (req, res) => {
    try {
        // Extract file paths
        const fileKeys = ['twentySignature', 'twentyReviewedSignature', 'twentyFiveSignature', 'twentySixSignature', 'twentySevenSignature', 'scannedFile'];
        const filePaths = fileKeys.reduce((acc, key) => {
            acc[key] = getFilePath(req.files, key);
            return acc;
        }, {});

        // Create certData object using spread operator
        const certData = {
            ...req.body,
            twentySignature: filePaths['twentySignature'],
            twentyReviewedSignature: filePaths['twentyReviewedSignature'],
            twentyFiveSignature: filePaths['twentyFiveSignature'],
            twentySixSignature: filePaths['twentySixSignature'],
            twentySevenSignature: filePaths['twentySevenSignature'],
            scannedFile: filePaths['scannedFile']
        };

        const result = await insertData(certData);
        
        if(result.error){
            return res.status(400).json({ error: result.message });
        }
        return res.status(201).json({ message: "Successfully registered!" });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering death certificate.' });
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
export const handleGetPaginatedDeathCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided
        
        const result = await getPaginatedDeathCertificates(page, limit);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const searchDeathCertificate = async(req,res) => {
    try {
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed

        const result = await searchDeathCertQuery(searchTerm);

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching birth certidficate data.' });
    }
}

export const handleGetSingleCertificate = async (req,res) => {
    const { id } = req.query;

    if(!id){
        return res.status(403).json({message:'Invalid ID'});
    }
    try {
        const response = await getSingleDeathCertificate(id);

            if(!response){
                return res.status(404).json('Death certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}

export const handleDeleteSingleDeathCert = async(req,res)=>{
    try {
        const { id } = req.body;

        await deleteSingleDeathCert(id);

        return res.status(200).json({message:"Certificate successfully deleted"})
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching birth certidficate data.' });
    }
}

export const handleUpdateDeathCert = async(req,res) =>{
    const { id } = req.params;
    const { formData } = req.body;

    try {
        if(!id){
            return res.status(400).json({ error: "ID is required" });
        }
        console.log(formData)
        await updateDeathCert(id, formData);

        return res.status(200).json({message:'Death certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}

export const handleUpdateDeathCertFile = async(req,res) =>{
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
        
        await updateDeathCert(id, formData);

        return res.status(200).json({message:'Death certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}