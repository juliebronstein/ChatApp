import React, { useContext } from 'react';
import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import './style.scss';
import Login from './pages/Login';

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  const NonLoggedInRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<NonLoggedInRoute><Login /></NonLoggedInRoute>} />
          <Route path="register" element={<NonLoggedInRoute><Register /></NonLoggedInRoute>} />
          <Route path='*' element={<NonLoggedInRoute><Login /></NonLoggedInRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
