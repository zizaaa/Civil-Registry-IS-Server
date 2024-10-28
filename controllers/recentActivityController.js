import { insertActivity, getAllActivity } from '../models/recentActivityModel.js';

export async function createActivity (req,res){
    const { message } = req.body;

    if(!message){
        return res.status(403).json({error:"No message."});
    }

    try {
        const data = {
            message,
            issued_by:req.user.name
        }
        await insertActivity(data);

        return res.status(201).json({message:"success"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Error adding activity"})
    }
}


export async function getActivity(req,res) {
    try {
        const recentAct = await getAllActivity();

        return res.status(201).json(recentAct)
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Error fetching activity"})
    }
}