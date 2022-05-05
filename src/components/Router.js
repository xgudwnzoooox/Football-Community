import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import PostFactory from 'routes/PostFactory';
import Home from 'routes/Home';
import Navigation from './Navigation';

const AppRouter = () => {
  const userObj = {
    uid : 2345,
  }

  return (
    <Router>
      <Navigation/>

      <Routes>
        <>
          
          <Route path='/' element = {<Home/>}/>
          
          <Route path="/postfactory" element = {<PostFactory/> } />
        
        </>
      </Routes>
    </Router>

  );
}

export default AppRouter;