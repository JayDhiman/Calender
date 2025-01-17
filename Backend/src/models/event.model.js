import cron from "node-cron"
import mongoose from 'mongoose';
import sendMail from '../service/emailService.js';
 // Assuming you use this for sending email notifications

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    startTime: {
        type: Date,
        required: [true, 'Please provide the start time'],
    },
    endTime: {
        type: Date,
        required: [true, 'Please provide the end time'],
    },
    reminderTime: {
        type: Number, // In minutes before the event (e.g., 30 minutes)
        default: 0,
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Meeting', 'Others'],
        default: 'Others',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

// Custom validation to ensure end time is after start time
eventSchema.pre('save', function(next) {
    if (this.startTime && this.endTime && this.endTime <= this.startTime) {
        return next(new Error('End time must be after start time.'));
    }
    next();
});

// Custom validation for update (using 'findOneAndUpdate')
eventSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.startTime && update.endTime && update.endTime <= update.startTime) {
        return next(new Error('End time must be after start time.'));
    }
    next();
});

// Post-save hook to schedule email reminders
eventSchema.post('save', async function(doc) {
    if (doc.reminderTime > 0) {
        const reminderDate = new Date(doc.startTime);
        reminderDate.setMinutes(reminderDate.getMinutes() - doc.reminderTime);  // Calculate the reminder time

        // Generate the cron expression for reminderDate
        const cronExpression = `${reminderDate.getMinutes()} ${reminderDate.getHours()} ${reminderDate.getDate()} ${reminderDate.getMonth() + 1} *`;

        // Schedule the cron job to send the reminder
        cron.schedule(cronExpression, async () => {
            try {
                await sendMail({
                    to: doc.user.email,
                    subject: `Reminder: ${doc.title}`,
                    text: `This is a reminder for your event "${doc.title}" scheduled at ${doc.startTime}.`,
                });
            } catch (error) {
                console.error(`Failed to send reminder for event "${doc.title}": ${error.message}`);
            }
        });
    }
});

eventSchema.index({ user: 1, startTime: 1 }); // Index for user and startTime

export const Event = mongoose.model('Event', eventSchema);
