import Post from "components/Post";

import { dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";

import Navigation from "components/Navigation";

const Home = ({userObj}) => {
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
    <>
      {init ? 
      <>
        <div className="container">
          <div style={{ marginTop: 30 }}>
            {posts.map((post) => (
              <Post
              key={post.id}
              postObj={post}
              // isOwner={nweet.creatorId === userObj.uid}  //생성자 아이디
            />
            ))}
          </div>
        </div>
      </>
      : 'initializing'
      
      }
    
    </>
  );
};
export default Home;
