import express from "express"
import { protect } from "../middleware/auth.middleware.js";
import  {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
 }  from "../controller/events.controller.js"

const router = express.Router();


router.route('/')
  .post(protect, createEvent)      // Create a new event
  .get(protect, getEvents);         // Get all events for the user

router.route('/:id')
  .get(protect, getEventById)       // Get details for a specific event
  .put(protect, updateEvent)        // Update an event
  .delete(protect, deleteEvent);    // Delete an event

   // Add/remove participants


export default router