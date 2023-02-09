import React from 'react';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import { Routes, Route } from "react-router-dom";
import Analytics from './components/pages/Analytics'
import Tips from './components/pages/Tips'
import MyFolders from './components/pages/MyFolders'
import Auth from './components/auth/Auth';
import { Container } from 'react-bootstrap';
import PrivateRoutes from './components/utils/PrivateRoute';
import AddEditBlog from './components/pages/AddEditBlog';
import Details from './components/pages/Details';


function App() {
  
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<><Home /> <Auth /> </>} />
          <Route path='/folders' element={<MyFolders />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/tips'>
            <Route index element={<Tips />} />
            <Route path='create' element={<AddEditBlog />} />
            <Route path='edit/:id' element={<AddEditBlog />} />
            <Route path='details/:id' element={<Details />} />
          </Route>
        </Route>
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
