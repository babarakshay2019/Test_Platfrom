import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import DashBoard from './compontents/Dashboard'
import ViewTest from './Pages/ViewTest';
import Results from './Pages/Result';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />  
        <Route path="/login" element={<LogIn/>} />  
        <Route path="/dashboard" element={<DashBoard />} />  
        <Route path="/view-test/:startTestId" element={<ViewTest />} />  
        <Route path="/results" element={<Results />} />                 
        
      </Routes>
    </Router>
  );
}

export default App;
