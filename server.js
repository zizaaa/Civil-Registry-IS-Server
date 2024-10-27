import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import * as dotenv from "dotenv";

import authChecker from "./auth/authChecker.js";
import userRoutes from "./routes/userRoutes.js";
import birthCertRoutes from "./routes/birthCertRoutes.js";
import deathCertRoutes from "./routes/deathCertRoutes.js";
import marriageCertRoutes from "./routes/marriageCertRoutes.js";
import foundlingCertRoutes from "./routes/foundlingCertRoutes.js"

dotenv.config();

const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Configure session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'session-cookie',
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,              // Ensure the cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
        sameSite: 'lax',             // Ensures cookies are sent on cross-origin requests
    },
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(authChecker);
app.use('/api/cris', userRoutes);
app.use('/api/cris/birth-certificate', birthCertRoutes);
app.use('/api/cris/death-certificate', deathCertRoutes);
app.use('/api/cris/marriage-certificate', marriageCertRoutes);
app.use('/api/cris/foundling-certificate', foundlingCertRoutes);

app.listen(8000,()=>{
    console.log('Server is running at port 8000');
});