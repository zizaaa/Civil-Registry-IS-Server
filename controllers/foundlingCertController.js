import { deleteSingleFoundlingCert, getFormNumber, getPaginatedFoundlingCertificates, getSingleFoundlingCertificate, insertData, searchFoundlingQuery, updateFoundlingCert } from "../models/foundlingsCertModel.js";

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

        const result = await insertData(certData);
        
        if(result.error){
            return res.status(400).json({ error: result.message });
        }
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
        
        const result = await getPaginatedFoundlingCertificates(page, limit);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const searchFoundlings = async(req,res) => {
    try {
        // Get search parameters from the query
        const { searchTerm } = req.query;  // Assuming a single search string; adjust as needed
        console.log(searchTerm)
        const result = await searchFoundlingQuery(searchTerm);

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
        const response = await getSingleFoundlingCertificate(id);

            if(!response){
                return res.status(404).json('Foundling certificate not found.');
            }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error finding certificate.' });
    }
}

export const handleDeleteSingleFoundlingCert = async(req,res)=>{
    try {
        const { id } = req.body;

        await deleteSingleFoundlingCert(id);

        return res.status(200).json({message:"Certificate successfully deleted"})
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching birth certidficate data.' });
    }
}

export const handleUpdateFoundlingCert = async(req,res) =>{
    const { id } = req.params;
    const { formData } = req.body;

    try {
        if(!id){
            return res.status(400).json({ error: "ID is required" });
        }
        console.log(formData)
        await updateFoundlingCert(id, formData);

        return res.status(200).json({message:'Foundling certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}

export const handleUpdateFoundlingCertFile = async(req,res) =>{
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
        
        await updateFoundlingCert(id, formData);

        return res.status(200).json({message:'Birth certificate'});
    } catch (error) {
        return res.status(500).json({ message: 'Error updating data.' });
    }
}