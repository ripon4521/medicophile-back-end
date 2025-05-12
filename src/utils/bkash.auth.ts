import axios from 'axios';
import { BkashTokenResponse } from '../module/bkash/bkash.interface';

export const getBkashToken = async (): Promise<BkashTokenResponse> => {
  // Live URL
  const url = `https://tokenized.sandbox.bka.sh/v1.2.0-beta/checkout/token/grant`;

  const headers = {
    username: "01770618567", 
    password:  "D7DaC<*E*eG", 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
  };

  const body = {
    app_key: "0vWQuCRGiUX7EPVjQDr0EUAYtc",  
    app_secret: "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx", 
  };

  try {
    // Sending the POST request to bKash
    const response = await axios.post<BkashTokenResponse>(url, body, { headers });

    // If successful, return the token data
    return response.data;
  } catch (error) {
    // Check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      console.error('bKash Error:', {
        statusCode,
        errorMessage,
        headers,
        body,
      });

      // Handle specific status codes
      if (statusCode === 403) {
        throw new Error('bKash payment initiation failed. Possible reasons: invalid credentials, expired token, or app not activated.');
      } else if (statusCode === 400) {
        throw new Error('Invalid request. Please check the input data.');
      } else {
        throw new Error(`Error occurred while getting bKash token: ${errorMessage}`);
      }
    } else {
      console.error('Non-Axios Error:', error);
      throw new Error('Unexpected error occurred.');
    }
  }
};
