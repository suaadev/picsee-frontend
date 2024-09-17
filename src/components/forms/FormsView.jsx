import { Outlet, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./forms.css";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import usePosts from "../../hooks/usePosts";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function FormsView() {
  const [currentPost, setCurrentPost] = useState(0);
  const [posts, setPosts] = useState([]);
  const { getRelevant } = usePosts();
  const navigate = useNavigate();

  const nextPost = () => {
    if (currentPost < posts.length - 1) {
      setCurrentPost(currentPost + 1);
    } else {
      setCurrentPost(0);
    }
  };

  const prevPost = () => {
    if (currentPost > 0) {
      setCurrentPost(currentPost - 1);
    } else {
      setCurrentPost(posts.length - 1);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      getRelevant((data, err) => {
        if (err) {
          return alert(err);
        }
        setPosts(data.data.posts);
      });
    }

    const id = setInterval(() => {
      nextPost();
    }, 7000);

    return () => {
      clearInterval(id);
    };
  }, [currentPost, posts]);

  return (
    <>
      <GoogleOAuthProvider clientId="961889040948-scqkdindt7p0vapfg7er8onor4peuu0i.apps.googleusercontent.com">
        <div className="container-forms">
          <GoArrowLeft
            onClick={() => {
              navigate("/");
            }}
            size={40}
            className="icon-back"
          />
          <Outlet />
          <div className="container-photo">
            <GrPrevious onClick={nextPost} size={50} className="button-prev" />
            <GrNext onClick={prevPost} size={50} className="button-next" />
            <img
              className="user-photo"
              src={posts[currentPost]?.image}
              alt=""
            />
            <div className="card-user-info">
              <img
                className="user-avatar"
                src={posts[currentPost]?.author.urlAvatar}
                alt=""
              />
              <p>@{posts[currentPost]?.author.username}</p>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default FormsView;
