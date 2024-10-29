import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import db from './db.js';

// Configure JWT strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        // Retrieve user from the database using the ID from the JWT payload
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

export default passport;
