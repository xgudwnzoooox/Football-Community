import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import PostFactory from 'routes/PostFactory';
import Home from 'routes/Home';
import Navigation from './Navigation';
import Post from './Post';
import { dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";

const AppRouter = () => {
  const userObj = {
    uid : 2345,
  }

  const [posts, setPosts] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const q = query(collection(dbService, "posts")
    // ,orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    setPosts(postArr);
    });

    setInit(true);
    
  }, []);

  return (
    <Router>
      <Navigation/>

      <Routes>
        <>
          <Route path='/postView/:id' element={<Post postObj={posts} />} />

          <Route path='/' element = {<Home posts={posts} />}/>
          
          <Route path="/postfactory" element = {<PostFactory/> } />
        
        </>
      </Routes>
    </Router>

  );
}

export default AppRouter;