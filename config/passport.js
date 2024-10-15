import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from './db.js';
import * as argon2 from "argon2";

// Configure the local strategy for use by Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await db('users').where({ username }).first();

            if (!user) {
                return done(null, false, { message: 'User not found.' });
            }

            if (await argon2.verify(user.password, password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Configure JWT strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, 
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await db('users').where({ id: jwtPayload.id }).first(); // Adjust as needed based on payload
        if (user) {
            return done(null, user); // Successfully authenticated
        } else {
            return done(null, false); // No user found
        }
    } catch (error) {
        return done(error, false); // Handle error
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    const userData = user.length >= 1 ? user[0]:user;
    console.log(`Serialize data...`);
    console.log(userData.id);
    done(null, userData.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user with ID:', id);
    try {
        const user = await db('users').where({ id }).first();  // Fetch user by ID
        console.log(`Deserialized user: ${user}`);
        if (user) {
            done(null, user);  // Successfully retrieved user
        } else {
            done(null, false);  // If no user found
        }
    } catch (error) {
        done(error, null);  // Handle error
    }
});

export default passport;