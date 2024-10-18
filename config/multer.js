import multer from "multer";
import path from "path";
import fs from "fs";

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Extract the value of one_last from req.body
        const folderName = req.body.one_last;

        // Create the full path for the folder inside the 'uploads' directory
        const dir = path.join('uploads', folderName);

        // Check if the folder exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Recursive to ensure all parent folders are created
        }

        // Pass the folder as the destination to multer
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Define how you want the file to be named in the folder
        cb(null, Date.now() + '-' + file.originalname); // Example: timestamp + original file name
    }
});

// Multer instance
export const upload = multer({ storage: storage });