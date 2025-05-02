import { Request, Response } from 'express';
import { sendMessage } from './whatsapp.service';


/**
 * Controller function to handle sending WhatsApp messages
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>} - We do not return a Response directly here.
 */
export const sendMessageController = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, message } = req.body;

  try {
    if (!phoneNumber || !message) {
      res.status(400).json({ success: false, error: 'Phone number and message are required.' });
      return;
    }

    // Send WhatsApp message via WhatsApp Cloud API
    const result = await sendMessage({ phoneNumber, message });

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
      data: result,
    });
  } catch (error) {
    console.error('❌ Error in sendMessageController:', error);
    res.status(500).json({
      success: false,
      error: error || 'Something went wrong while sending message.',
    });
  }
};
