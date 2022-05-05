import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const PostFactory = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  const navigate = useNavigate();
  

  const userObj = {
    uid : 2345,
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uuid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      //storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }

    const postObj = {
      text: post,
      createdAt: Date.now(),
      // creatorId : userObj.uid,
      attachmentUrl,
      title,
      
    };
    
    await addDoc(collection(dbService, "posts"), postObj);
    setAttachment("");
    setPost("");
    setTitle("");
    GoMenu();
    
  };

  const onChangeText = ({ target: { value } }) => {
    setPost(value);
  };
  const onChangeTitle = ({ target: { value } }) => {
    setTitle(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = (event) => {
    setAttachment("");
    fileInput.current.value = "";
  }

  const GoMenu = () => {
    navigate("/")
  }

  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="what's your title"
            maxLength={120}
          />
        </div>
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={post}
            onChange={onChangeText}
            type="text"
            placeholder="what's your post"
            maxLength={120}
          />
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>

        {/* <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
        </label> */}
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
          // style={{
          //   opacity: 0,
          // }}
        />

        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
                width: 100,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
            </div>
          </div>
        )}
      </form>
      <div onClick={GoMenu}>
        목록
      </div>
    </>
  );
};
export default PostFactory;