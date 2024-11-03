import db from "../config/db.js"

// find by id
export const findById = (id) =>{
    return db('users').where({id}).first();
}
// Create a new user
export const createUser = (data) =>{
    return db('users').insert(data).returning('*');
}

//existing user
export const existingUser = (username, email) => {
    return db('users').where({username}).orWhere({email}).first();
}

//login user
export const loginUser = (username) => {
    return db('users').where({username}).first();
}

// update user
export const updateUser = async (userId, updates) => {
    try {
        // Filter out null, undefined, and empty string values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        if (Object.keys(filteredUpdates).length === 0) {
            throw new Error("No fields provided for update");
        }

        await db('users')
            .where({ id: userId })
            .update(filteredUpdates);

        return { message: "User updated successfully" };
    } catch (error) {
        throw new Error('Unable to update user');
    }
};