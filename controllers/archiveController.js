import { archiveData, getPaginatedArchivedCertificates, unArchive } from "../models/archiveModel.js";

export const archive = async (req,res) =>{
    try {
        const data = req.body;

        const response = await archiveData(data);
        if(response.error){
            return res.status(400).json({ error: response.message });
        }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Error archiving data.' });
    }
}

export const handleGetPaginatedArchiveCertificates = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Get the page from query params
        const limit = parseInt(req.query.limit) || 10;  // Set a default limit if not provided

        const result = await getPaginatedArchivedCertificates(page, limit);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching paginated data.' });
    }
};

export const handleUnArchive = async(req,res) =>{
    try {
        const data = req.body;

        const response = await unArchive(data);
        if(response.error){
            return res.status(400).json({ error: response.message });
        }

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ error: 'Error unarchiving data.' });
    }
}