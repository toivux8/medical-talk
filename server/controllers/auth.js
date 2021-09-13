const { connect } = require('getstream');
const bcryp = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const login = async(req, res) => {
    try {
        const { fullName, username, phoneNumber, password } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcryp.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const signup = (req, res) => {
    try {

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

module.exports = { login, signup };
module.exports = { login, signup };