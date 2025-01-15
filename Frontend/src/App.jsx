import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route,   } from 'react-router-dom';
import Home from './screens/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './Utilities/PrivateRoute';






const Dashboard = lazy(() => import('./screens/Dashboard/Dashboard'));
const TaskPage = lazy(() => import('./screens/Dashboard/TaskPage'));
const SettingsPage = lazy(() => import('./screens/Dashboard/SettingsPage'));
const EventPage = lazy(() => import('./screens/Dashboard/EventPage'));
const Calender = lazy(() => import('./screens/Dashboard/Calender'));

const App = () => {


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       
  
        {/* Protected Routes - Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute> 
              <Suspense fallback={<div>Loading...</div>}> 
                <Dashboard /> 
              </Suspense>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/calendar" 
          element={
            <PrivateRoute> 
              <Suspense fallback={<div>Loading...</div>}> 
                <Calender /> 
              </Suspense>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/tasks" 
          element={
            <PrivateRoute> 
              <Suspense fallback={<div>Loading...</div>}> 
                <TaskPage /> 
              </Suspense>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute> 
              <Suspense fallback={<div>Loading...</div>}> 
                <SettingsPage /> 
              </Suspense>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/event" 
          element={
            <PrivateRoute> 
              <Suspense fallback={<div>Loading...</div>}> 
                <EventPage /> 
              </Suspense>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;