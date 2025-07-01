import jwt from 'jsonwebtoken';

// Presigned client secrets for Foodpanda
const CLIENT = {
    [process.env.FOODPANDA_CLIENT_ID]: process.env.FOODPANDA_CLIENT_SECRET,
};

// Function to generate access token
export const generateAccessToken = (client) => {
    return jwt.sign({ client }, process.env.JWT_SECRET, { expiresIn: 3600 });
}
// Function to generate refresh token
export const generateRefreshToken = (client) => {
    return jwt.sign({ client }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
}


// Controller to handle token generation
export const generateToken = async (req, res) => {
    const { username, password } = req.body;

    const storedSecret = CLIENT[username];
    if (!storedSecret || storedSecret !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const access_token = generateAccessToken(username)
    const refresh_token = generateRefreshToken(username)
    res.json({
        success: true,
        access_token: {
            token: access_token,
            expires_in: '1h'
        },
        refresh_token: {
            token: refresh_token,
            expires_in: '30d'
        }
    });
}

// Controller to handle token refresh
export const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ client: decoded.client }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });


        res.status(200).json({ success: true, accessToken: { token: newAccessToken, expires_in: '1h' } });
    } catch (err) {
        return res.status(403).json({ error: err, message: 'Invalid refresh token' });
    }
}