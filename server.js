import express from "express";
import cors from "cors";
import passport from "./config/passport.js"; // Updated import for Passport
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authChecker from "./auth/authChecker.js";
import userRoutes from "./routes/userRoutes.js";
import birthCertRoutes from "./routes/birthCertRoutes.js";
import deathCertRoutes from "./routes/deathCertRoutes.js";
import marriageCertRoutes from "./routes/marriageCertRoutes.js";
import foundlingCertRoutes from "./routes/foundlingCertRoutes.js";
import recentActRoutes from "./routes/recentActRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); // For parsing cookies
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Initialize Passport
app.use(passport.initialize()); // Removed passport.session()

// Use the authChecker middleware to protect routes as needed
app.use(authChecker);

// Define your routes
app.use('/api/cris', userRoutes);
app.use('/api/cris/birth-certificate', birthCertRoutes);
app.use('/api/cris/death-certificate', deathCertRoutes);
app.use('/api/cris/marriage-certificate', marriageCertRoutes);
app.use('/api/cris/foundling-certificate', foundlingCertRoutes);
app.use('/api/cris/recent-activity', recentActRoutes);
app.use('/api/cris/reports', reportRoutes);

// Start the server
app.listen(8000, () => {
    console.log('Server is running at port 8000');
});