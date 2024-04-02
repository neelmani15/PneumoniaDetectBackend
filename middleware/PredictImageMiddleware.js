const axios = require('axios');
const { execSync } = require('child_process');

const fetchAccessToken = async () => {
    try {
      // Execute the gcloud command to fetch the access token
      const accessToken = execSync('gcloud auth print-access-token').toString().trim();
      // console.log('Access Token:', accessToken);
  
      return accessToken;
    } catch (error) {
      console.error('Error fetching access token:', error.message);
      throw error;
    }
  };

const ImageMiddleware = async (req, res) => {
    try {
      const { imageBase64 } = req.body;
    //   console.log(req.body);
      if (!imageBase64) {
        return res.status(400).json({ error: 'No image data provided' });
      }
  
      const token = await fetchAccessToken();
    //   console.log('Access Token:', token);
  
      const requestBody = {
        instances: [{ content: imageBase64 }],
        parameters: {
          confidenceThreshold: 0.5,
          maxPredictions: 5
        }
      };
  
      const response = await axios.post(process.env.PREDICT_URL, requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const data = response.data;
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = ImageMiddleware;