import jwt from 'jsonwebtoken';
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Get the token from cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err); // Log the error
                return res.sendStatus(403); // Forbidden
            }
            req.user = user; // Attach user data to request object
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

export default isAuthenticated;
