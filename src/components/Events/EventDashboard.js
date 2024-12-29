import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
      setFilteredEvents(eventList);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });
    setFilteredEvents(sortedEvents);
  }, [sortOrder]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredEvents(events.filter(event => event.category === category));
    } else {
      setFilteredEvents(events);
    }
  };

  return (
    <div className="event-dashboard-container">
      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-filter">
          <option value="">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Networking">Networking</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-button">
          Sort by Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <h2>Event Dashboard</h2>
      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
