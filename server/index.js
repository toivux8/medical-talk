const express = require('express');
const cors = require('cors');

const authRouters = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send("Hello!");
});

app.use('.auth', authRouters);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));