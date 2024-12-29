import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EventCreate = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'events'), {
        title,
        description,
        date,
        location,
        category,
        attendees: [],
      });
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setCategory('');
      setSuccess('Event created successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="event-create-container">
      <div className="event-create-card">
        <h2>Create Event</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleCreateEvent}>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select Category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Networking">Networking</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
