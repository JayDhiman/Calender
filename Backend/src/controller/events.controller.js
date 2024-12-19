import { Event } from "../models/event.model.js";
import sendMail from "../service/emailService.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/apiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";



// Helper function to schedule email reminder
const scheduleReminder = async (event) => {
    if (event.reminderTime > 0) {
        const reminderDate = new Date(event.startTime);
        reminderDate.setMinutes(reminderDate.getMinutes() - event.reminderTime);

        // Check if the reminder time has already passed
        if (new Date() >= reminderDate) {
            // Send email immediately if reminder time has passed
            await sendMail({
                to: event.user.email, // Assumes user's email is accessible in the `user` field
                subject: `Reminder: ${event.title}`,
                text: `This is a reminder for your event "${event.title}" scheduled at ${event.startTime}.`,
            });
        }
    }
};

// Create an Event
export const createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, startTime, endTime, reminderTime, category } = req.body;

    // Validate required fields
    if (!title || !startTime || !endTime) {
        return next(new ApiError(400, 'Title, Start Time, and End Time are required fields.'));
    }

    // Optional field validation
    if (reminderTime && reminderTime <= 0) {
        return next(new ApiError(400, 'Reminder Time must be a positive number or zero.'));
    }

    const event = new Event({
        title,
        description,
        startTime,
        endTime,
        reminderTime: reminderTime || 0, // Use provided reminderTime or default to 0
        category: category || 'Others',  // Default category if not provided
        user: req.user._id,              // The authenticated user's ID
    });

    await event.save();

    // Schedule the email reminder
    await scheduleReminder(event);

    const response = new ApiResponse(201, event, 'Event created successfully');
    res.status(201).json(response);
});

// Get all events for a user
export const getEvents = asyncHandler(async (req, res, next) => {
    const { category } = req.query;  // Optional filter by category

    let query = { user: req.user._id }; // Only fetch events for the logged-in user
    if (category) query.category = category; // If category filter is provided, add it to the query

    const events = await Event.find(query);

    if (!events.length) {
        return res.status(200).json(new ApiResponse(200, [], 'No events found.'));
    }

    res.status(200).json(new ApiResponse(200, events, 'Events retrieved successfully'));
});

// Get an event by ID
export const getEventById = asyncHandler(async (req, res, next) => {
    const event = await Event.findOne({ _id: req.params.id, user: req.user._id });

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    res.status(200).json(new ApiResponse(200, event, 'Event retrieved successfully'));
});

// Update an event by ID
export const updateEvent = asyncHandler(async (req, res, next) => {
    const { title, description, startTime, endTime, reminderTime, category } = req.body;

    // Optional validation
    if (reminderTime && reminderTime <= 0) {
        return next(new ApiError(400, 'Reminder Time must be a positive number or zero.'));
    }

    // Prepare update data
    const updateData = {
        title,
        description,
        startTime,
        endTime,
        reminderTime: reminderTime || 0, // Use provided reminderTime or default to 0
        category: category || 'Others',   // Default category if not provided
    };

    const event = await Event.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        updateData,
        { new: true, runValidators: true }
    );

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    // Reschedule the email reminder if needed
    await scheduleReminder(event);

    res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
});

// Delete an event by ID
export const deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
});
