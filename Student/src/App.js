import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screns/Login';
import Register from './screns/Register';
import Home from './screns/Home';
import About from './screns/about';
import Search from './screns/search';
import ForgotPassword from './screns/ForgotPassword';
import Event from './screns/Event';


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
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />}/>
                    <Route path="/event" element={<ProtectedRoute element={<Event />} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
