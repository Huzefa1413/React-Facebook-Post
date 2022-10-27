import React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';
import profile from './assets/profile.png';
import post from './assets/post.png';
import Posts from './Posts.jsx';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, serverTimestamp, orderBy } from "firebase/firestore";

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

const AddPosts = () => {

    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);

    const savePost = async (e) => {
        e.preventDefault();
        if (postText === "") {
            alert("Please Write Something to Post");
        }
        else {
            document.getElementById("postinput").value = "";
            setPostText("");
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    text: postText,
                    createdOn: serverTimestamp(),
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    useEffect(() => {
        let unsubscribe = null;
        const getRealtimeData = async () => {
            const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const posts = [];

                querySnapshot.forEach((doc) => {
                    posts.push({ id: doc.id, ...doc.data() });
                });
                setPosts(posts);
            });
        }
        getRealtimeData();
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <>
            <div className="addpost">
                <div className="top">
                    <img src={profile} alt="" />
                    <input id='postinput' type="text" placeholder="What's on your mind?" onChange={(e) => { setPostText(e.target.value) }} />
                </div>
                <hr />
                <div className="bottom">
                    <div className='button' onClick={savePost}>
                        <img src={post} alt="" />
                        <p>Post</p>
                    </div>
                </div>
            </div>
            {
                posts.map((eachPost, i) => (
                    <Posts key={i} post={eachPost} />
                ))
            }
        </>
    )
}

export default AddPosts