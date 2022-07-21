import Post from "./Post";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
// const posts = [
//   {
//     id: "123",
//     username: "puzzle",
//     userImg:
//       "https://lh3.googleusercontent.com/a-/AFdZucqfsr6g9JLLbyQiknnSylhhmE1I8oL6umab1hFG=s96-c",
//     img: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f8417.appspot.com/o/posts%2FUS2aamYpwrKA5Ba0bX7j%2Fimage?alt=media&token=f0f866de-1471-4880-8612-c5077e48007c",
//     caption: "This is caption for the post",
//   },
//   {
//     id: "124",
//     username: "puzzleiran",
//     userImg:
//       "https://lh3.googleusercontent.com/a-/AFdZucqfsr6g9JLLbyQiknnSylhhmE1I8oL6umab1hFG=s96-c",
//     img: "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f8417.appspot.com/o/posts%2FIGcnlsvEra7y4zvMsO8T%2Fimage?alt=media&token=4fdf05e7-d185-495b-9c98-f8c972aebb35",
//     caption: "This is caption for the post - second post",
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => setPosts(snapshot.docs)
      ),
    []
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
