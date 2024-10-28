import { getCertificateCounts } from "../models/reportModel.js";

// get all certificate count 
export const handleGetAllCount = async (req,res) =>{
    try {
        const data = await getCertificateCounts();

        return res.status(201).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Error fetching data"});
    }
}