import express from "express"

import  {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
 }  from "../controller/events.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected routes require authentication middleware (protect)
router.route('/')
  .post(verifyJWT, createEvent)      // Create a new event
  .get(verifyJWT, getEvents);         // Get all events for the user

router.route('/:id')
  .get(verifyJWT, getEventById)       // Get details for a specific event
  .put(verifyJWT, updateEvent)        // Update an event
  .delete(verifyJWT, deleteEvent);    // Delete an event

   // Add/remove participants


export default router