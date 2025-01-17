import { Event } from "../models/event.model.js";
import { ApiError } from "../utilities/apiError.js";
import { scheduleReminder, cancelCronJob } from './cronService.js';

// Service to create an event
export const createEventService = async (userId, eventData) => {
    const { title, description, startTime, endTime, reminderTime, category } = eventData;

    // Validate required fields
    if (!title || !startTime || !endTime) {
        throw new ApiError(400, 'Title, Start Time, and End Time are required fields.');
    }

    // Create the event in the database
    const event = await Event.create({
        title,
        description,
        startTime,
        endTime,
        reminderTime: reminderTime || 0,
        category: category || 'Others',
        user: userId,
    });

    // Schedule the email reminder
    await scheduleReminder(event);

    return event;
};

// Service to get all events for a user with pagination and category filtering
export const getEventsService = async (userId, query) => {
    const { category, page = 1, limit = 10 } = query;
    let eventQuery = { user: userId };

    if (category) eventQuery.category = category;

    const events = await Event.find(eventQuery)
        .skip((page - 1) * limit) // Pagination
        .limit(limit)             // Limit the number of events
        .sort({ startTime: 1 });  // Sort by start time in ascending order

    return events;
};

// Service to get an event by ID
export const getEventByIdService = async (userId, eventId) => {
    const event = await Event.findOne({ _id: eventId, user: userId });

    if (!event) {
        throw new ApiError(404, 'Event not found or not accessible to this user.');
    }

    return event;
};

// Service to update an event by ID
export const updateEventService = async (userId, eventId, eventData) => {
    const { title, description, startTime, endTime, reminderTime, category } = eventData;

    // Fetch the event from the database (to handle partial updates)
    const existingEvent = await Event.findOne({ _id: eventId, user: userId });

    if (!existingEvent) {
        throw new ApiError(404, 'Event not found or not accessible to this user.');
    }

    // Merge the existing data with the updated data
    const updatedStartTime = startTime || existingEvent.startTime;
    const updatedEndTime = endTime || existingEvent.endTime;

    // Manual validation for startTime and endTime
    if (new Date(updatedEndTime) <= new Date(updatedStartTime)) {
        throw new ApiError(400, 'End time must be after start time.');
    }

    const updateData = {
        title: title || existingEvent.title,
        description: description || existingEvent.description,
        startTime: updatedStartTime,
        endTime: updatedEndTime,
        reminderTime: reminderTime || existingEvent.reminderTime,
        category: category || existingEvent.category,
    };

    // Perform the update
    const event = await Event.findOneAndUpdate(
        { _id: eventId, user: userId },
        updateData,
        {
            new: true,           // Return the updated document
            runValidators: true, // Enforce schema-level validation
        }
    );

    // Reschedule the email reminder
    await scheduleReminder(event);

    return event;
};

// Service to delete an event by ID
export const deleteEventService = async (userId, eventId) => {
    const event = await Event.findOneAndDelete({ _id: eventId, user: userId });

    if (!event) {
        throw new ApiError(404, 'Event not found or not accessible to this user.');
    }

    // Cancel the scheduled cron job
    cancelCronJob(event._id);
};
