// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
console.log("Welcome");
const userRoutes = require('./routes/auth')
const reviewRoutes = require('./routes/review');
const componentCardRoutes = require('./routes/componentCard');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());


app.use('/api/user',userRoutes);

app.use('/api/review',reviewRoutes);
<<<<<<< HEAD

=======
app.use('/api/componentCard',componentCardRoutes);
>>>>>>> 29dcf127b826af6c8db5c5df01de37f23a8d4726
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
