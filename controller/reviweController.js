const pool = require('../database/db.js');

// Add a review to the database
const addReviwe = (req, res) => {
    const { companyName, pros, cons, review } = req.body;

    const sql = 'INSERT INTO reviews (company_name, pros, cons, review) VALUES (?, ?, ?, ?)';
    pool.query(sql, [companyName, pros, cons, review], (err, result) => {
        if (err) {
            console.error('Error adding review:', err);
            return res.status(500).send('Failed to add review');
        }
        res.send('Review added successfully!');
    });
};

// Search reviews
const searchReview = (req, res) => {
    const companyName = req.query.companyName;

    const sql = 'SELECT * FROM reviews WHERE company_name LIKE ?';
    pool.query(sql, ['%' + companyName + '%'], (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).send('Failed to fetch reviews');
        }
        res.json(results);
    });
};

// Get all reviews
const getAllReview = (req, res) => {
    const sql = 'SELECT * FROM reviews';
    pool.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).send('Failed to fetch reviews');
        }
        res.json(results);
    });
};

// Export the functions
module.exports = { getAllReview, addReviwe, searchReview };
