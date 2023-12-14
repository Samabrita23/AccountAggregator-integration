
const axios = require('axios');
const tokenManager = require('./tokenManager');

// Function to initiate a consent request
const initiateConsent = async () => {
  try {
    // Getting the token before making the consent request
    const token = await tokenManager.generateToken();

    // Check if token generation was successful
    if (!token) {
      console.error('Token generation failed. Cannot proceed with consent initiation.');
      return null;
    }

    // Data for the consent request
    const data = {
      consentDuration: {
        unit: 'MONTH',
        value: '24',
      },
      vua: '9999999999@onemoney',
      dataRange: {
        from: '2022-12-01T00:00:00Z',
        to: '2023-08-12T00:00:00Z',
      },
      context: [],
    };

    // Making a POST request to the Setu API to create a new consent with the generated token
    const response = await axios.post('https://fiu-sandbox.setu.co/v2/consents', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Checking if consent creation was successful
    if (response.data && response.data.id && response.data.url && response.data.status === 'PENDING') {
      // Extracting consent details from the response
      const consentId = response.data.id;
      const consentUrl = response.data.url;

      // Logging success message and returning the consent ID
      console.log(`Consent created successfully. Consent ID: ${consentId}`);
      console.log(`Redirecting to consent manager URL to initiate consent review flow: ${consentUrl}`);

      //to get consent details
      const getConsentResponse = await axios.get(`https://fiu-sandbox.setu.co/v2/consents/${consentId}`, {
        headers: {
          'x-product-instance-id': consentId,
          Authorization: `Bearer ${token}`,
        },
      });

      // Checking if get consent is successful
      if (getConsentResponse.data && getConsentResponse.data.url && getConsentResponse.data.status === 'ACTIVE') {
        console.log('Get Consent Successful:', JSON.stringify(getConsentResponse.data));
      } else {
        // Logging an error if get consent fails
        console.error('Failed to get consent:', getConsentResponse.data.errorMsg || 'Unknown error');
      }

      return consentId;
    } else {
      // Logging an error if consent creation fails
      const errorCode = response.data.errorCode || 'UnknownError';
      const errorMsg = response.data.errorMsg || 'Unknown error';

      // Mapping specific error codes to corresponding messages
      let errorMessage;
      if (errorCode === 'InvalidRequest') {
        errorMessage = 'Invalid request body or invalid response from upstream';
      } else if (errorCode === 'InternalServerError') {
        errorMessage = 'An internal server error has occurred. Please try again later.';
      } else {
        errorMessage = errorMsg;
      }

      console.error(`Failed to create consent. Error Code: ${errorCode}, Error Message: ${errorMessage}`);
      return null;
    }
  } catch (error) {
    // Logging an error if there's an exception during the process
    console.error('Error creating consent:', error.response ? error.response.data : error.message);
    return null;
  }
};


module.exports = initiateConsent;
