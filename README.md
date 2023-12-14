# Account Aggregator Integration

## Overview

This project demonstrates integration with the Setu Account Aggregator API using Node.js and Axios. It covers key functionalities such as consent handshake, creating a data session, and fetching sample data.

## Prerequisites

- Node.js installed
- Setu Account Aggregator API credentials (client ID and client secret) after creating a FIU account

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Samabrita23/AccountAggregator-integration.git
   cd AccountAggregator-integration
2. Install dependencies:
   ```bash
   npm install axios
4. Set up API credentials:
  Open tokenManager.js and replace clientId and clientSecret with your Setu API credentials.
5. Run the project:
   ```bash
   node index.js

## Project Structure
   Components: 
   - consentHandshake.js: Handles consent creation, approval, and review.
   - createDataSession.js: Manages data session creation and fetching FI data.
   
   Token Management
   - tokenManager.js: Generates and manages Bearer tokens for API authentication.
     
   Index File
   - index.js: Orchestrates the workflow by calling functions from the components.

## API Documentation
   https://docs.setu.co/data/account-aggregator/overview


Feel free to open issues for any problems or suggestions. Contributions are welcome!
