const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started at port number ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("<h1> Server home page </h1>")
})