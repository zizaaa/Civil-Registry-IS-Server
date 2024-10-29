import passport from "passport";
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";
import { createUser, existingUser, findById, loginUser, updateUser } from "../models/userModel.js";

async function existingUserChecker(username, email) {
    const existing = await existingUser(username, email);

    if (existing) {
        return `${existing.username === username ? 'Username already exists' : 'Email already exists'}`;
    }

    return false;
}

// Modify the login function
export async function login(req, res, next) {
    const { username, password, remember } = req.body; // Extract the remember parameter
    try {
        const user = await loginUser(username); // Assuming loginUser fetches the user from the database

        // Verify the password
        if (await argon2.verify(user.password, password)) {
            // Generate JWT token
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: remember ? '365d' : '1d' }); // Set expiration based on remember
            console.log(user);
            
            // Set the token in the cookie
            res.cookie('token', token, {
                httpOnly: true, // Helps prevent XSS attacks
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 365 days or 1 day
            });

            console.log('Logged in successfully');
            return res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, username: user.username }, token });
        } else {
            return res.status(403).json({ message: 'Incorrect password.' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Cannot log in user.' });
    }
}

export async function registerUser(req, res) {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(404).json({ message: "Please complete all the information needed!" });
    }

    const userExist = await existingUserChecker(username, email);

    if (userExist) {
        res.status(403).json({ message: userExist });
        return;
    }

    try {
        const hashedPass = await argon2.hash(password);

        const userData = {
            username,
            name,
            email,
            password: hashedPass
        };

        await createUser(userData);

        return res.status(201).json({ message: 'Success' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error creating user' });
    }
}

export async function currentUser(req, res) {
    try {
        const user = req.user;

        const existingUser = await findById(user.id);
        const userData = {
            id: existingUser.id,
            username: existingUser.username,
            name: existingUser.name,
            email: existingUser.email
        };
        return res.status(200).json(userData); // Changed status to 200 for success
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}

export async function logout(req, res) {
    // Clear the JWT token cookie
    res.clearCookie('token', {
        httpOnly: true, // Make sure it's marked as HttpOnly
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Lax', // Adjust according to your needs
        path: '/' // Specify the path if needed
    });

    console.log('User logged out successfully and token cleared');
    return res.status(200).json({ message: 'Logged out successfully.' });
}


// Update personal info
export const updatePersonalInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Ensure userId exists
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const updatedUser = await updateUser(id, updates);
        return res.status(200).json(updatedUser); // Changed status to 200 for success
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating user information" });
    }
};

// Update password
export const updatePassword = async (req, res) => {
    try {
        const user = req.user; // Get the current user from the request
        const { password, oldPassword } = req.body;

        if (await argon2.verify(user.password, oldPassword)) {
            const hashedPass = await argon2.hash(password);
            
            const update = {
                password: hashedPass
            };

            const updatedUser = await updateUser(user.id, update); // Use user.id instead of req.params.id
            return res.status(200).json(updatedUser); // Changed status to 200 for success
        } 

        return res.status(403).json({ message: 'Incorrect password.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating password" });
    }
};