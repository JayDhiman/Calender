import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter an event title'],
    },
    description: {
      type: String,
      default: '',
    },
    dateTime: {
      type: Date,
      required: [true, 'Please enter the date and time of the event'],
    },
    duration: {
      type: Number,
      default: 60, // in minutes
    },
    location: {
      type: String,
      default: '',
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    reminderTime: {
      type: Date, // Set a specific time for reminder
    },
    repeat: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'none',
    },
    colorCode: {
      type: String,
      default: '#0000FF', // Default color (blue)
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  }, {
    timestamps: true,
  });

const Event = mongoose.model('Event',eventSchema)

export default Event;