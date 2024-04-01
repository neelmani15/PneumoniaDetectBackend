const express = require('express');
const ImageMiddleware = require('../middleware/PredictImageMiddleware');

const router = express()

router.route('/').post(ImageMiddleware);

module.exports = router;