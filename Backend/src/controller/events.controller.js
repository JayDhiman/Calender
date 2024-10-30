import Event from "../models/event.model.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import { ApiResponse } from "../utilities/ApiResponse.js";
import { ApiError } from "../utilities/apiError.js";

// Create an Event
export const createEvent = asyncHandler(async (req, res, next) => {
    const { title, description, dateTime, duration, location, isAllDay } = req.body;

    if (!title || !dateTime) {
        return next(new ApiError(400, 'Title and Date/Time are required fields.'));
    }

    if (duration && duration <= 0) {
        return next(new ApiError(400, 'Duration must be a positive number.'));
    }

    const event = new Event({
        title,
        description,
        dateTime,
        duration,
        location,
        isAllDay,
        userId: req.user._id,
    });

    await event.save();
    
    const response = new ApiResponse(201, event, 'Event created successfully');
    res.status(201).json(response);
});

// Get all events
export const getEvents = asyncHandler(async (req, res, next) => {
    const events = await Event.find({ userId: req.user._id });

    if (!events.length) {
        return res.status(200).json(new ApiResponse(200, [], 'No events found for this user.'));
    }

    res.status(200).json(new ApiResponse(200, events, 'Events retrieved successfully'));
});

// Get event by ID
export const getEventById = asyncHandler(async (req, res, next) => {
    const event = await Event.findOne({ _id: req.params.id, userId: req.user._id });

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    res.status(200).json(new ApiResponse(200, event, 'Event retrieved successfully'));
});

// Update an event by ID
export const updateEvent = asyncHandler(async (req, res, next) => {
    const updateData = req.body;

    const event = await Event.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        updateData,
        { new: true, runValidators: true }
    );

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
});

// Delete an event by ID
export const deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!event) {
        return next(new ApiError(404, 'Event not found or not accessible to this user.'));
    }

    res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
});
