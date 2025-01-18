import logger from "../utilities/logger.js"
import cron from 'node-cron';
import sendMail from './emailService.js';


const cronJobs = {}; // Object to track active cron jobs by event ID

// Schedule a reminder for an event
export const scheduleReminder = async (event) => {
    if (event.reminderTime > 0) {
        const reminderDate = new Date(event.startTime);
        reminderDate.setMinutes(reminderDate.getMinutes() - event.reminderTime);

        const cronExpression = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${reminderDate.getMonth() + 1} *`;

        // Cancel any existing job for this event
        if (cronJobs[event._id]) {
            cronJobs[event._id].stop();
            delete cronJobs[event._id];
            logger.info(`Cancelled previous cron job for event "${event.title}"`);
        }

        // Schedule the new cron job
        const job = cron.schedule(cronExpression, async () => {
            try {
                await sendMail({
                    to: event.user.email,
                    subject: `Reminder: ${event.title}`,
                    text: `This is a reminder for your event "${event.title}" scheduled at ${event.startTime}.`,
                });

                logger.info(`Reminder sent for event "${event.title}" at ${reminderDate}`);
            } catch (error) {
                logger.error(`Failed to send reminder for event "${event.title}": ${error.message}`);
            }
        });

        // Store the cron job for later reference
        cronJobs[event._id] = job;
        logger.info(`Scheduled reminder for event "${event.title}" at ${reminderDate}`);
    }
};

// Cancel the cron job for a specific event
export const cancelCronJob = (eventId) => {
    const job = cronJobs[eventId];
    if (job) {
        job.stop();
        delete cronJobs[eventId];
        logger.info(`Cron job for event with ID "${eventId}" has been cancelled.`);
    }
};