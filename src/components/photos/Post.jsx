/* eslint-disable react/prop-types */
import { useState } from "react";
import OptionsPost from "./OptionsPost";
import "./post.css";
import capitalizeString from "../../utils/capitalizeString";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const [dataPhoto, setDataPhoto] = useState("collapse");
  const [brightness, setBrightness] = useState(100);
  const navigate = useNavigate();
  return (
    <>
      <div
        id={post.id}
        onMouseEnter={() => {
          setDataPhoto("visible");
          setBrightness(80);
        }}
        onMouseLeave={() => {
          setDataPhoto("collapse");
          setBrightness(100);
        }}
        className="block-photos__container-post"
      >
        <img
          src={post.urlImage}
          className="block-photos__photo"
          alt=""
          loading="lazy"
        />

        <div
          className="block-photos__data-photo "
          style={{
            visibility: dataPhoto,
            backdropFilter: `brightness(${brightness}%)`,
          }}
        >
          <div
            className="block-photos__info-author"
            onClick={() => navigate(`/perfil/${post.author.username}`)}
          >
            <img
              className="bloc-photos__avatar-author"
              src={post.author.urlAvatar}
              alt=""
            />
            <div className="block-photos__container-text">
              <p className="block-photos__author_name">
                {capitalizeString(post.author.username)}
              </p>
              <p className="block-photos__date_upload">
                {new Date(post.uploadAt).toDateString()}
              </p>
            </div>
          </div>
          <OptionsPost post={post} />
        </div>
      </div>
    </>
  );
}

export default Post;
