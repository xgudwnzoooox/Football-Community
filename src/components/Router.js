import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import PostFactory from 'routes/PostFactory';
import Home from 'routes/Home';
import Navigation from './Navigation';

const AppRouter = () => {

  return (
    <Router>
      <Navigation/>

      <Routes>
        <>
          
          <Route path='/' element = {<Home/>}/>
          
          <Route path="/postfactory" element = {<PostFactory/>} />
        
        </>
      </Routes>
    </Router>

  );
}

export default AppRouter;