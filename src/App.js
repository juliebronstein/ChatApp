import React from 'react';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./style.scss";
const App = ()=>{
    return (
        <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            // element={
            //   <ProtectedRoute>
            //     <Home />
            //   </ProtectedRoute>
            // }
          />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    ) 
}

export default App;
