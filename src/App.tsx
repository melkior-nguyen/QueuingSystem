import React from 'react';
import './App.css';
import './CustomStyle/root.css'
import './CustomStyle/button.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//component 
import { Navbar } from './Components';
import { Dashboard, Device, Progression, Report, Service, System, User } from './Pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main_container">
          <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='*' element={<Dashboard/>}></Route>
            <Route path='/device' element={<Device/>}></Route>
            <Route path='/service' element={<Service/>}></Route>
            <Route path='/progression' element={<Progression/>}></Route>
            <Route path='/report' element={<Report/>}></Route>
            <Route path='/system' element={<System/>}></Route>
            <Route path='/user' element={<User/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
