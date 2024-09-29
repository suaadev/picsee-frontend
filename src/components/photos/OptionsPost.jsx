/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdArrowDown } from "react-icons/io";
import download from "js-file-download";
import usePosts from "../../hooks/usePosts";

// eslint-disable-next-line react/prop-types
function OptionsPost({ post }) {
  const [liked, setLiked] = useState(post.liked);

  const { like } = usePosts();
  const likeHandler = () => {
    const localSession = window.sessionStorage.getItem("session");
    const session = localSession ? JSON.parse(localSession) : undefined;
    if (!session) {
      return alert("Please sign in first.");
    }
    setLiked(!liked);
    like((data, err) => {
      if (err) {
        alert(err);
      }
    }, post.id);
  };
  useEffect(() => {}, []);
  return (
    <div className="block-photos__options">
      <IoMdArrowDown
        onClick={async () => {
          const resp = await fetch(
            import.meta.env.VITE_API_URL + `post/${post.id}/download`
          );

          if (resp.ok) {
            const blob = await resp.blob();
            const metadata = JSON.parse(resp.headers.get("Meta-Data"));
            download(blob, `${metadata.name}`);
          } else {
            alert("Error downloading file");
          }
        }}
        className="block-photos__icon-download"
        size={20}
      />
      <FaHeart
        onClick={() => {
          likeHandler();
        }}
        size={30}
        color={liked ? "red" : ""}
        className="block-photos__icon-heart"
      />
    </div>
  );
}

export default OptionsPost;
