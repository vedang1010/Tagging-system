// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review');
const componentCardRoutes = require('./routes/componentCard');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/componentCard',componentCardRoutes);
app.get('/', (req, res) => {
    res.send('Hello, Component Store!');
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB')
});


app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
