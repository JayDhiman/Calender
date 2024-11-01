import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Utilities/Auth';
import Login from './components/Login';
import MainPage from './screens/MainPage';
import Signup from './components/Signup';
import Home from './screens/Home'

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

    
      </Routes>
    </Router>
  );
};

export default App;
