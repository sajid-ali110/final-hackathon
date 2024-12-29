import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuthAction = async (action, ...args) => {
    try {
      setError(null);
      switch (action) {
        case 'login':
          return await signInWithEmailAndPassword(auth, ...args);
        case 'signup':
          return await createUserWithEmailAndPassword(auth, ...args); 
        case 'resetPassword':
          return await sendPasswordResetEmail(auth, ...args);
        case 'logout':
          return await signOut(auth);
        default:
          throw new Error('Unsupported action');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = (email, password) => handleAuthAction('login', email, password);
  const signup = (email, password) => handleAuthAction('signup', email, password);
  const resetPassword = (email) => handleAuthAction('resetPassword', email);
  const logout = () => handleAuthAction('logout');

  const value = {
    currentUser, 
    login,
    signup,
    resetPassword,
    logout,
    error 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
