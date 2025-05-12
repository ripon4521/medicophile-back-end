import { Request, Response } from 'express';
import { createBkashPayment } from './bakash.service';


export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const payment = await createBkashPayment(amount);
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(500).json({
      message: 'bKash payment initiation failed',
      error: error,
    });
  }
};
