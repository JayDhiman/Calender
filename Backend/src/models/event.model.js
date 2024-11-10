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

export const Event = mongoose.model('Event', eventSchema);
