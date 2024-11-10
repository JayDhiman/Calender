import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./screens/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./screens/Dashboard/Dashboard";
import TaskPage from "./screens/Dashboard/TaskPage";
import SettingsPage from "./screens/Dashboard/SettingsPage";
import EventPage from "./screens/Dashboard/EventPage";
import Calender from "./screens/Dashboard/Calender";
import PrivateRoute from "./Utilities/PrivateRoute";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route - Dashboard */}

        <Route element={<PrivateRoute token={token} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/event" element={<EventPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
