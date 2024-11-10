import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useCreateEventMutation, useUpdateEventMutation } from '../Api/eventsApi.js'; // Import RTK Query hooks

const EventModal = ({ event, closeModal }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [startTime, setStartTime] = useState(event ? event.startTime : '');
  const [endTime, setEndTime] = useState(event ? event.endTime : '');
  
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const handleSave = async () => {
    if (event) {
      // Update event
      await updateEvent({ id: event._id, title, description, startTime, endTime });
    } else {
      // Create new event
      await createEvent({ title, description, startTime, endTime });
    }
    closeModal();
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          type="datetime-local"
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
        />
        <TextField
          type="datetime-local"
          label="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
