import './App.css';
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import AddStudent from './Screens/AddStudent';
import PostEvent from './Screens/PostEvent';
import ForgotPassword from './Component/ForgotPassword';
import Event from './Screens/Event';

// Function to check if the JWT token is valid
const isTokenValid = () => {
  const token = localStorage.getItem('jwttoken');
  return token !== null;
};

 
const ProtectedRoute = ({ element, path }) => {
  useEffect(() => {
 
    if (!isTokenValid()) {
      window.location.href = '/'; 
    }
  }, []);

  // Render the element (component) only if the token is valid
  return isTokenValid() ? element : <Navigate to="/" />;
};


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/addstudent" element={<ProtectedRoute element={<AddStudent />} />} />
          <Route path="/postevent" element={<ProtectedRoute element={<PostEvent />} />} />
          <Route path="/forgotpassword" element={<ForgotPassword />}/>
          <Route path="/event" element={<ProtectedRoute element={<Event />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
