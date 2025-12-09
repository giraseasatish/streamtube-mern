const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // 1. Get the token from the Authorization header (where Postman will send it)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; 

    // Logic: If no token is provided, access is denied.
    if (!token) return res.status(401).json("You are not authenticated!");

    // 2. Verify the token against our secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Logic: If jwt.verify finds a mismatch (token is fake or expired), access is denied.
        if (err) return res.status(403).json("Token is not valid!");

        // 3. If valid, save the user's ID/isAdmin status to the request object.
        // The final route logic (e.g., "Upload Video") can now see who the user is via req.user.
       req.user = user; 
        
        // 4. Move to the next function (the actual Upload Route code).
        next(); 
    });
};

module.exports = verifyToken;