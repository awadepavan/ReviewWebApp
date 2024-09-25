const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database/db.js');
const cors  = require('cors');
const reviewRoutes = require('./routes/reviewRoutes.js');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from 'public' directory
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + "./public/index.html"); // serve the HTML file
});

// Routes
app.use('/api', reviewRoutes);

pool.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
