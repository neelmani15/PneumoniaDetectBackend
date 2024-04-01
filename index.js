const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const PredictImageRoutes = require('./routes/PredictImageRoute.js');

dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, welcome to Detect X-ray Image');
});

app.use('/predict',PredictImageRoutes);

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
