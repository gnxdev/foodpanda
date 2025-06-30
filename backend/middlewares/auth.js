import jwt from 'jsonwebtoken'

// Middleware to verify Foodpanda and Grab tokens
const verifyFoodpandaToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401).json({message: 'Missing or invalid token'});
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.client !== 'foodpanda') throw new Error("Invalid Client");
        next();
    } catch(err) {
        return res.status(401).json({message: 'Unauthorized: ' + err.message});
    }
}
export default verifyFoodpandaToken;