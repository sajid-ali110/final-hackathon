import React from 'react';

const EventDetail = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Category: {event.category}</p>
      <h3>Attendees:</h3>
      <ul>
        {event.attendees.map((attendee, index) => (
          <li key={index}>{attendee}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetail;