const express = require('express');
const router = express.Router();
const { validateReview } = require('../middleware');
const { productReviews } = require('../controllers/review');


router.post('/products/:id/review', validateReview, productReviews);

module.exports = router;

