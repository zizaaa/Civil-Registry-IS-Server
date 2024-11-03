import { insertActivity, getAllActivity } from '../models/recentActivityModel.js';
import { findById } from '../models/userModel.js';

export async function createActivity (req,res){
    const { message } = req.body;

    if(!message){
        return res.status(403).json({error:"No message."});
    }

    try {
        const user = await findById(req.user.id)
        
        const data = {
            message,
            issued_by:user.name
        }
        await insertActivity(data);

        return res.status(201).json({message:"success"})
    } catch (error) {
        return res.status(500).json({error:"Error adding activity"})
    }
}


export async function getActivity(req,res) {
    try {
        const recentAct = await getAllActivity();

        return res.status(201).json(recentAct)
    } catch (error) {
        return res.status(500).json({error:"Error fetching activity"})
    }
}