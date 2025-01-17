import {createEventService,getEventByIdService,getEventsService,updateEventService,deleteEventService}  from "../service/eventservice.js"
import { ApiResponse } from "../utilities/ApiResponse.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import logger from "../utilities/logger.js";  // Assuming you have Winston for logging

// Utility function for creating standardized responses
const sendResponse = (res, status, data, message) => {
    return res.status(status).json(new ApiResponse(status, data, message));
};

// Create an Event
export const createEvent = asyncHandler(async (req, res, next) => {
    try {
        const event = await createEventService(req.user._id, req.body);
        logger.info(`Event created by user ${req.user._id}`);
        sendResponse(res, 201, event, 'Event created successfully');
    } catch (error) {
        logger.error(`Error creating event: ${error.message}`);
        next(error);  // Ensure error is handled correctly
    }
});

// Get all events for a user with pagination
export const getEvents = asyncHandler(async (req, res, next) => {
    try {
        const events = await getEventsService(req.user._id, req.query);
        sendResponse(res, 200, events, 'Events retrieved successfully');
    } catch (error) {
        logger.error(`Error retrieving events: ${error.message}`);
        next(error);  // Handle error
    }
});

// Get an event by ID
export const getEventById = asyncHandler(async (req, res, next) => {
    try {
        const event = await getEventByIdService(req.user._id, req.params.id);
        sendResponse(res, 200, event, 'Event retrieved successfully');
    } catch (error) {
        logger.error(`Error retrieving event by ID: ${error.message}`);
        next(error);
    }
});

// Update an event by ID
export const updateEvent = asyncHandler(async (req, res, next) => {
    try {
        const event = await updateEventService(req.user._id, req.params.id, req.body);
        sendResponse(res, 200, event, 'Event updated successfully');
    } catch (error) {
        logger.error(`Error updating event: ${error.message}`);
        next(error);
    }
});

// Delete an event by ID
export const deleteEvent = asyncHandler(async (req, res, next) => {
    try {
        await deleteEventService(req.user._id, req.params.id);
        logger.info(`Event with ID ${req.params.id} deleted by user ${req.user._id}`);
        sendResponse(res, 200, null, 'Event deleted successfully');
    } catch (error) {
        logger.error(`Error deleting event: ${error.message}`);
        next(error);
    }
});
