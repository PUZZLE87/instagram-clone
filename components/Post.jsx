import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

function Post({ id, username, userImg, img, caption }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");

  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  console.log(comments);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),

    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  console.log(likes);
  const likedPost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img - post */}
      <img src={img} alt="" className="object-cover w-full" />

      {/* buttons */}
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          {hasLiked ? (
            <HeartIconFilled onClick={likedPost} className="btn text-red-500" />
          ) : (
            <HeartIcon onClick={likedPost} className="btn" />
          )}

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn rotate-45" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <div className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} Likes</p>
        )}
        <span className="font-bold mr-1">{username}</span> {caption}
      </div>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-3" key={comment.id}>
              <img
                className="h-7 w-7 rounded-full"
                src={comment.data().userImg}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-3">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment className="pr-5 text-sm text-gray-400" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comments..."
            className="flex-1 border-none focus:ring-0 outline-none "
          />
          <button
            disabled={!comment.trim()}
            onClick={sendComment}
            type="submit"
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
