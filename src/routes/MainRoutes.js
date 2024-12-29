import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { Login, Signup, ForgotPassword } from '../components/Auth';
import { EventDashboard, EventCreate } from '../components/Events';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const MainRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EventDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-event" element={<EventCreate />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default MainRoutes;