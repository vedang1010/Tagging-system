// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
console.log("Welcome");
const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review');
const componentCardRoutes = require('./routes/componentCard');
const ComponentStoreRoutes = require("./routes/ComponentStoreRoutes");
const commentsRoutes = require("./routes/comments");
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);

app.use('/api/review',reviewRoutes);

app.use('/api/componentCard',componentCardRoutes);
app.use('/api/comments',commentsRoutes);

app.use('/api/ComponentStore',ComponentStoreRoutes);
app.get('/', (req, res) => {
    res.send('Hello, Component Store!');
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
