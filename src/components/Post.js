import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc }from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";


const Post = ({ }) => {
  const [posts, setPosts] = useState([]);
  const [init, setInit] = useState(false);

  if(init === false){
    const q = query(collection(dbService, "posts")
    );
  
    onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
    setPosts(postArr);
    setInit(true);
    });
  } 

  const {id} = useParams(); 

  if(init === false ) return 
  
  const getPostByNo = id => {

    const array = [...posts].filter(x => x.id === id);
    if (array.length === 1) {
      return array[0];
    }
    return null;
  }

  
  
  let postObj = getPostByNo(id);
  
  // const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
  
  // const onDeleteClick = async () => {
  //   const ok = window.confirm("Are you sure you want to delete this nweet?");
  //   if (ok) {
  //     await deleteDoc(NweetTextRef );
  //     if(nweetObj.attachmentUrl !== "" ){
  //       await deleteObject(ref(storageService, nweetObj.attachmentUrl));
  //     }
  //   }
  // };
  // const toggleEditing = () => setEditing((prev) => !prev);
  
  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   await updateDoc(NweetTextRef, {
  //     text: newNweet,
  //   });
  //   setEditing(false);
  // };
  // const onChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNewNweet(value);
  // };

  return (
    <div className="nweet">
      {/* {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              autoFocus
              onChange={onChange}
              className='formInput'
            />
            <input type="submit" value="Update Nweet" className="formBtn"/>
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : ( */}

        <>
          <h4>Title: {postObj.title},  Score: {postObj.text}</h4>

          {postObj.attachmentUrl && <img src={postObj.attachmentUrl} style = {{width : 100}} />}
          {/* {isOwner && (
            <div className = "nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )} */}
        </>
      {/* )} */}
    </div>
  );
};

export default Post;