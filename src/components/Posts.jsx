import React from 'react';
import { useState } from 'react';
import profile from './assets/profile.png';
import '../index.css';
import moment from 'moment';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQxGQSZ9xxr90Zokmn7YVU5spvRM_E-ok",
    authDomain: "react-socialmediaapp-560cd.firebaseapp.com",
    projectId: "react-socialmediaapp-560cd",
    storageBucket: "react-socialmediaapp-560cd.appspot.com",
    messagingSenderId: "465350864561",
    appId: "1:465350864561:web:5e80dc764e0eb25a2d3c90"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Posts = (props) => {

    const [editText, setEditText] = useState("");
    const [editing, setEditing] = useState(false);

    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
    }

    const updatePost = async (postId, editedText) => {
        console.log(postId)
        console.log(editedText);
        setEditing(false);
        await updateDoc(doc(db, "posts", postId), {
            text: editedText
        });
    }
    return (
        <div className="post">
            <div className="posthead">
                <div className="picname">
                    <img src={profile} alt="" />
                    <div className="nametime">
                        <p>Huzefa Mustafa</p>
                        <p>{moment((props.post.createdOn?.seconds) ? props.post.createdOn?.seconds * 1000 : undefined).format('Do MMMM, h:mm a')}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className={"postcontent"}>{(!editing) ? <p>{props.post.text}</p> : <input autoFocus type="text" value={editText} onChange={(e) => { setEditText(e.target.value) }} />}</div>

            <hr />
            <div className="image">
                <img src={props.post.img} alt="" />
            </div>
            <hr />
            <div className="buttonbox">
                <button onClick={() => { deletePost(props.post.id) }}>Delete</button>
                <button className={`${(!editing) ? "" : "none"}`} onClick={() => { setEditing(true); setEditText(props.post.text) }}>Edit</button>
                <button className={`${(editing) ? "" : "none"}`} onClick={() => { props.post.text = editText; updatePost(props.post.id, props.post.text) }}>Update</button>
            </div>
        </div>
    )
}

export default Posts;