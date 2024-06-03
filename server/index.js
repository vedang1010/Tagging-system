// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const userRoutes = require('./routes/auth')
const app = express();


app.use(express.json());
require('dotenv').config();
app.use(cors());
app.use('/api/user',userRoutes);
app.get('/', (req, res) => {
    res.send('Hello, Component Store!');
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB')
});


app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
