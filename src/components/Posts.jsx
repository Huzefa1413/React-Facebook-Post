import React from 'react';
import { useState } from 'react';
import profile from './assets/profile.png';
import '../index.css';
import moment from 'moment';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

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
            {(props.post.text) ?
                <>
                    <div className={"postcontent"}>
                        {(!editing) ?
                            <p>{props.post.text}</p> :
                            <input autoFocus type="text" value={editText} onChange={(e) => { setEditText(e.target.value) }} />}
                    </div>
                    <hr />
                </> : ""
            }
            {(props.post.img) ?
                <>
                    <div className="image">
                        <img src={props.post.img} alt="" />
                    </div>
                    <hr />
                </> : ""}
            <div className="buttonbox">
                <button onClick={() => { deletePost(props.post.id) }}>Delete</button>
                <button className={`${(!editing) ? "" : "none"}`} onClick={() => { setEditing(true); setEditText(props.post.text) }}>Edit</button>
                <button className={`${(editing) ? "" : "none"}`} onClick={() => { props.post.text = editText; updatePost(props.post.id, props.post.text) }}>Update</button>
            </div>
        </div>
    )
}

export default Posts;