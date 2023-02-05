import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Routes, Route, redirect } from "react-router-dom";
import Analytics from './components/pages/Analytics'
import About from './components/pages/About'
import Tips from './components/pages/Tips'
import MyFolders from './components/pages/MyFolders'
import Auth from './components/auth/Auth';
import { Container } from 'react-bootstrap';
import PrivateRoutes from './components/utils/PrivateRoute';


function App() {
  
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/folders' element={<MyFolders />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/tips' element={<Tips />} />
        </Route>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Auth />
    </Container>
  );
}

export default App;
