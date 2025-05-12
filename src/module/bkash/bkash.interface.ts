export interface BkashTokenResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface BkashPaymentResponse {
  paymentID: string;
  createTime: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  paymentExecuteTime?: string;
  trxID?: string;
}
