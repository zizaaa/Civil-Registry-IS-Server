import db from "../config/db.js";

// insert activity
export const insertActivity = (data) =>{
    return db('recent_activity').insert(data).returning('*');
}

// get all the activity
export const getAllActivity = () =>{
    return db('recent_activity').select('*');
}