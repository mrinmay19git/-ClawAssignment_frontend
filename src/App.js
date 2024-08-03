import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/userContext'; // Ensure proper import
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import { baseURL } from './Urls';

axios.defaults.baseURL = `${baseURL}`;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider> {/* Wrap the entire app */}
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route  path = "/" element={<Home />} /> */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          {/* Add a redirect route for unknown paths */}
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
