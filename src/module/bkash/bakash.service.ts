import axios from 'axios';
import { BkashPaymentResponse } from './bkash.interface';
import { getBkashToken } from '../../utils/bkash.auth';
import AppError from '../../helpers/AppError';
import { StatusCodes } from 'http-status-codes';

export const createBkashPayment = async (
  amount: number
): Promise<BkashPaymentResponse> => {
  // Get the token from the helper function
  const tokenData = await getBkashToken();
  if (!tokenData) {
    throw new AppError(StatusCodes.NOT_FOUND, "Token Not FOund")
  }
  console.log(tokenData)
  const accessToken = tokenData.id_token;
  console.log(accessToken)

  // URL for payment creation (change this to live URL for production)
  const url = `${process.env.BKASH_BASE_URL}/checkout/payment/create`;

  const headers = {
    authorization: accessToken,  // Authorization token from the previous step
    'x-app-key': process.env.BKASH_APP_KEY as string,  // Live app key
    'Content-Type': 'application/json',
  };

  // Generating a unique invoice number
  const invoice = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Request body for bKash payment
  const body = {
    mode: '0011',  // Payment mode, ensure this is correct according to bKash documentation
    payerReference: '01770618567',  // Ensure the payer reference is valid
    callbackURL: process.env.BKASH_CALLBACK_URL as string,  // Callback URL to handle the response
    amount: amount.toString(),  // Convert amount to string as required by bKash API
    currency: 'BDT',  // Ensure currency is set to BDT (Bangladeshi Taka)
    intent: 'sale',  // Payment intent, ensure this matches the bKash requirements
    merchantInvoiceNumber: invoice,  // Unique invoice number
  };

  try {
    // Send POST request to bKash for payment creation
    const response = await axios.post<BkashPaymentResponse>(url, body, { headers });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Error creating bKash payment:', error);
    throw error;
  }
};
