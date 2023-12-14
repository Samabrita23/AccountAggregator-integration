
const axios = require('axios');
const tokenManager = require('./tokenManager');

// Function to create a data session
const createDataSession = async (consentId) => {
  try {
    // getting the token before making the data session request
    const token = tokenManager.getToken();

    // Checking if a valid token is available
    if (!token) {
      console.error('No valid token available. Cannot proceed with data session creation.');
      return null;
    }

    // Data for the data session request
    const data = {
      consentId: consentId,
      dataRange: {
        from: '2021-05-30T11:39:57.154Z',
        to: '2021-06-30T16:30:16.363Z',
      },
      format: 'json',
    };

    // Making a POST request to the Setu API to create a new data session with the generated token
    const response = await axios.post('https://fiu-sandbox.setu.co/v2/sessions', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-product-instance-id': consentId,
      },
    });

    // Checking if data session creation was successful
    if (response.data && response.data.sessionId) {
      // Extracting session details from the response
      const sessionId = response.data.sessionId;

      // Logging success message and returning the session ID
      console.log(`Data session created successfully. Session ID: ${sessionId}`);
      return sessionId;
    } else {
      // Logging an error if data session creation fails
      const errorCode = response.data.errorCode || 'UnknownError';
      const errorMsg = response.data.errorMsg || 'Unknown error';

      // Map specific error codes to corresponding messages
      let errorMessage;
      if (errorCode === 'NotFound') {
        errorMessage = 'Consent not found';
      } else if (errorCode === 'InvalidRequest') {
        errorMessage = 'Invalid request body';
      } else if (errorCode === 'InternalServerError') {
        errorMessage = 'An internal server error has occurred. Please try again later.';
      } else {
        errorMessage = errorMsg;
      }

      console.error(`Failed to create data session. Error Code: ${errorCode}, Error Message: ${errorMessage}`);
      return null;

    }
  } catch (error) {
    // Logging an error if there's an exception during the process
    console.error('Error creating data session:', error.response ? error.response.data : error.message);
    return null;
  }
};
// Function to get FI data status
const getFIDataStatus = async (consentId) => {
  try {
    // Make a GET request to the Setu API to get FI data status
    const response = await axios.get(`https://fiu-sandbox.setu.co/v2/consents/${consentId}/fetch/status`, {
      headers: {
        Authorization: `Bearer ${tokenManager.getToken()}`,
        'x-product-instance-id': consentId,
      },
    });

    // Return the FI data status
    return response.data;
  } catch (error) {
    // Log an error if there's an exception during the process
    console.error('Error getting FI data status:', error.response ? error.response.data : error.message);
    return null;
  }
};

module.exports = {
  createDataSession,
  getFIDataStatus,
};
