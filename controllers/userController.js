import passport from "passport";
import jwt from 'jsonwebtoken'
import * as argon2 from "argon2";
import { createUser, existingUser } from "../models/userModel.js";

async function existingUserChecker(username,email){
    const existing = await existingUser(username,email);

    if(existing){
        return `${existing.username === username ? 'Username already exist':'Email already exist'}`;
    }

    return false;
}

export async function login(req,res,next){
    passport.authenticate('local',(err, user, info) => {
        if (err) return next(err);

        if (!user) return res.status(403).json({ message: info.message });

        req.login(user, (err) => {
            if (err) return next(err);

            if(req.body.remember){
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            } else {
                req.session.cookie.maxAge = 24 * 60 * 60 * 1000; // 1 day (default)
            }

            req.session.save((err) => {
                if (err) return next(err);
                console.log('Logged in successfully')
                res.json({ message: 'Logged in successfully' });
            });
        })
    })(req, res, next);
}

export async function registerUser(req,res){
    const { username, name, email, password} = req.body;

    if(!username || !name || !email || !passport){
        return res.status(404).json({message:"Please complete all the information needed!"})
    }

    const userExist = await existingUserChecker(username,email);

    if(userExist){
        res.status(403).json({message:userExist})
        return;
    }

    try {
        const hashedPass = await argon2.hash(password);

        const userData = {
            username, 
            name, 
            email, 
            password:hashedPass
        }

        await createUser(userData);

        return res.status(201).json({message:'Success'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error creating user' });
    }
}

export async function logout(req, res) {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: "Log out failed." });
        }
        console.log("User logged out using req.logout()");
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not remove session.' });
            }
            res.clearCookie('session-cookie', { path: '/' }); // Check the session cookie name
            console.log('Session destroyed and cookie cleared');
            return res.status(200).json({ message: 'Logged out successfully.' });
        });
    });
}
