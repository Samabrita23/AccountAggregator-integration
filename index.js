const consentHandshake = require('./src/Components/consentHandshake');
const createDataSession = require('./src/Components/createDataSession');

const fetchData = async () => {
  try {
    // Step 1: Initiating consent handshake
    const consentId = await consentHandshake();

    if (consentId) {
      // Step 2: Creating data session
      const sessionId = await createDataSession.createDataSession(consentId);

      if (sessionId) {
        // Step 3: Get FI data status
        const fiDataStatus = await createDataSession.getFIDataStatus(consentId);

        console.log('FI Data Status:', fiDataStatus);
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

// Invoking the fetchData function to start the process
fetchData();
