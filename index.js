const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();



// Routes
// app.get('/', (req, res) => {
//     res.send('We are at not home!');
// });


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// connect to database
const db = process.env.DB_CONN
mongoose.connect(db ,() => {
    console.log('Connected to database!');
    });

    
const reportRoutes = require('./routes/reports');
app.use('/reports', reportRoutes);


// listen
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    });