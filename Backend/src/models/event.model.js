// models/event.model.js
import mongoose from 'mongoose';

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
        enum: ['Work', 'Personal', 'Meeting', 'Others'], // Example categories
        default: 'Others',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming each event is tied to a user
        required: true,
    },
}, { timestamps: true });

// Custom validation to ensure end time is after start time
eventSchema.path('endTime').validate(function(value) {
    return value > this.startTime;
}, 'End time must be after start time');

// Pre-save hook to handle reminderTime calculation (if necessary)
eventSchema.pre('save', function(next) {
    if (this.reminderTime && this.startTime) {
        // Reminder time is already in minutes, but we can calculate the reminder date
        this.reminderTime = this.startTime - this.reminderTime * 60000; // in milliseconds
    }
    next();
});

// Indexing for performance
eventSchema.index({ user: 1, startTime: 1 }); // Index for user and startTime

// Instance method to check if the event overlaps with another event (optional)
eventSchema.methods.isOverlapping = async function() {
    const existingEvent = await Event.findOne({
        user: this.user,
        $or: [
            { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } }, // Check for overlap
        ],
    });

    return existingEvent ? true : false;
};

export const Event = mongoose.model('Event', eventSchema);
