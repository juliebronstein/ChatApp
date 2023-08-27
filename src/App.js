import React, { useContext } from 'react';
import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
// import Login from './pages/Login';
import "./style.scss";
import Login from './pages/Login';
const App = ()=>{
  const {currentUser}=useContext(AuthContext)
  // console.log("currentUser",currentUser)
  const ProtectedRoute=({children})=>{
    if(!currentUser) return <Navigate to='/login'/>
      return children; // Return the children when currentUser is truthy
 
  }
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ) 
}

export default App;
