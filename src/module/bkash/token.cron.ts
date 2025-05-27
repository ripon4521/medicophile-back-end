import cron from 'node-cron';
import TokenModel from './token.model';

// Cron runs every 30 minutes (e.g., 12:00, 12:30, 1:00, etc.)
cron.schedule('*/30 * * * *', async () => {
  try {
    const now = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // Bangladesh time

    // Find all active (non-expired) tokens
    const tokens = await TokenModel.find({ isExpire: false });

    for (const token of tokens) {
      const createdAt = token.createdAt as Date;
      const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

      if (diffInMinutes >= 30) {
        await TokenModel.updateOne(
          { _id: token._id },
          { $set: { isExpire: true } }
        );
        console.log(`⏳ Token "${token.token}" expired at ${now.toISOString()}.`);
      }
    }

    console.log('✅ 30-minute token expiry check completed.');
  } catch (error) {
    console.error('❌ Error in token expiry check:', error);
  }
});
