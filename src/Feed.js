import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ArticleIcon from '@mui/icons-material/Article';
import "./Feed.css"
import Post from "./Post";
// eslint-disable-next-line
import * as FirestoreService from './firebase.js';

import InputOption from './InputOption';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
// import { collection, query, getDocs } from 'firebase/firestore';
// import { collection, onSnapshot, doc } from 'firebase/firestore';
// import { serverTimestamp } from 'firebase/firestore';
// import { FirebaseError } from 'firebase/app';
// const defaultPost = [{key: "", created: "", createdBy: "cheeky", description: "hey", message: "this is the default message. it worked!", photoUrl: ""}];

function Feed() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = FirestoreService.streamPosts(
            (querySnapshot) => {
                const updatedPosts = 
                querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setPosts(updatedPosts);
            }
        );
        return unsubscribe;
    }, []);

    const sendPost = e => {
        e.preventDefault();

        // eslint-disable-next-line
        const newPost = FirestoreService.createPost(user.displayName, user.email, input, user.photoUrl || "");
        setInput("");
        // console.log("New post ID created: " + newPost);
    }

  return (
    <div className="feed">
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                    <button onClick={sendPost} type="submit">Send</button>
                </form>
            </div>

            <div className="feed__inputOptions">
                {/* Input Option */}
                <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
                <InputOption Icon={SubscriptionsIcon} title="Video" color="#e7a33e" />
                <InputOption Icon={EventNoteIcon} title="Event" color="#c0cbcd" />
                <InputOption Icon={ArticleIcon} title="Write Article" color="#7fc15e" />
            </div>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
            <Post key={post.id} name={post.createdBy} description={post.description} message={post.message} photoUrl={post.photoUrl} />
        ))}

    </div>
  )
}

export default Feed;