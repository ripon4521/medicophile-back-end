import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { whatsappMessageSchema } from './whatsapp.validation';
import { sendMessageController } from './whatsapp.controller';
import { sendMessage } from './whatsapp.service';


const whatsAppRouter = express.Router();

// API route to send WhatsApp message
whatsAppRouter.post('/send-whatsapp', validateRequest(whatsappMessageSchema), sendMessageController);

// Webhook route to handle incoming WhatsApp messages
whatsAppRouter.post('/webhook', async (req, res) => {
  const incomingMessage = req.body;
  
  console.log('📩 Incoming WhatsApp Message:', incomingMessage);

  const message = incomingMessage?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body;
  const sender = incomingMessage?.entry[0]?.changes[0]?.value?.messages[0]?.from;

  if (message) {
    console.log(`Received message from ${sender}: ${message}`);
    
    // Send automatic reply
    const reply = `Thank you for your message: "${message}"`;
    await sendMessage({ phoneNumber: sender, message: reply });
  }

  res.status(200).send('EVENT_RECEIVED');
});

export default whatsAppRouter;
