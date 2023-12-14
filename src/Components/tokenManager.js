
const axios = require('axios');

// Setting the client ID and client secret
const clientId = '255d0b6c-492d-44cf-8581-e9494c7b0914';
const clientSecret = '9c2fc756-3d17-46d6-b28d-be4d71953e83';

let token = null;

// Function to generate a token
const generateToken = async () => {
  try {
    const tokenUrl = 'https://uat.setu.co/api/v2/auth/token'; 

    // Making a POST request to generate a token
    const response = await axios.post(tokenUrl, {
      clientID: clientId,
      secret: clientSecret,
    });

    // Checking if token generation was successful
    if (response.data && response.data.success && response.data.data && response.data.data.token) {
      // Logging success message and storing the token
      console.log('Token generated successfully.');
      token = response.data.data.token;
      return token;
    } else {
      // Logging an error if token generation fails
      console.error('Failed to generate token:', response.data.errorMsg || 'Unknown error');
      return null;
    }
  } catch (error) {
    // Logging an error if there's an exception during the process
    console.error('Error generating token:', error.response ? error.response.data : error.message);
    return null;
  }
};

// Function to get the stored token
const getToken = () => {
  return token;
};

module.exports = {
  generateToken,
  getToken,
};
