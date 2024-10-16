import db from "../config/db.js"

// Create a new user
export const createUser = async (data) =>{
    return db('users').insert(data).returning('*');
}

//existing user
export const existingUser = async(username, email) => {
    return db('users').where({username}).orWhere({email}).first();
}