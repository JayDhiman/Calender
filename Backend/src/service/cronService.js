// src/services/cronService.js
import cron from 'node-cron';
import { Event } from '../models/event.model.js';
import sendMail from './emailService.js';


const startCronJobs = () => {
  cron.schedule('*/5 * * * *', async () => {
    console.log("Running scheduled task for reminders...");

    try {
      const currentTime = new Date();
      const futureTime = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes from now

      const events = await Event.find({
        startTime: { $lte: futureTime, $gte: currentTime },
        reminderTime: { $gt: 0 },
      }).populate('user', 'email');

      for (const event of events) {
        await sendMail({
          email: event.user.email,
          subject: 'Upcoming Event Reminder',
          message: `This is a reminder for your upcoming event "${event.title}" starting at ${event.startTime}.`,
        });
      }

      console.log("Reminders sent successfully.");
    } catch (error) {
      console.error("Error sending reminders:", error);
    }
  });
};

export default startCronJobs;
