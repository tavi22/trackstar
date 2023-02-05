import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Routes, Route } from "react-router-dom";
import Analytics from './components/pages/Analytics'
import About from './components/pages/About'
import Tips from './components/pages/Tips'
import MyFolders from './components/pages/MyFolders'



function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/folders' element={<MyFolders />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/tips' element={<Tips />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
