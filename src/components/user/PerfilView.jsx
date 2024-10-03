import { useEffect, useRef, useState } from "react";
import PhotosView from "../photos/PhotosView";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import "./perfilview.css";
import { useNavigate } from "react-router-dom";

export default function PerfilView() {
  const { userQuery } = useParams();
  const userDataInfo = JSON.parse(
    window.sessionStorage.getItem("session") ?? "{}"
  );
  const [fullnameView, setFullnameView] = useState("");
  const [usernameView, setUsernameView] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [avatarView, setAvatarView] = useState();
  const { getUser } = useUser();
  const [p, setP] = useState("active-option");
  const [l, setL] = useState("deactivate-option");
  const navigate = useNavigate();
  const queryUser = useRef(userQuery);
  const queryLked = useRef(false);

  useEffect(() => {
    const localSession = window.sessionStorage.getItem("session");
    const session = localSession ? JSON.parse(localSession) : {};

    getUser(userQuery, (res, error) => {
      if (error) {
        return alert(error.message || "Failed to load user profile");
      }
      const { data } = res;
      setFullnameView(data.username);
      setUsernameView(data.username);
      setAvatarView(data.urlAvatar);
      setBio(data.bio);
      setSocialLinks(data.socialLinks);

      if (session.username === userQuery) {
        window.sessionStorage.setItem("userInfo", JSON.stringify(data));
      }
    });
  }, []);

  return (
    <div className="block-perfil">
      <div className="block-perfil__container-info-user">
        <img src={avatarView} className="block-perfil__avatar" alt="Avatar" />
        <div className="block-perfil__container-data">
          <div className="block-perfil__top-data">
            <p className="block-perfil__fullname">{fullnameView}</p>
            <div className="block-perfil__options">
              {userDataInfo?.username === usernameView ? (
                <div
                  className="block-perfil__btn-edit-perfil btn-option"
                  onClick={() => navigate("/perfil/edit")}
                >
                  Edit Profile
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <p className="block-perfil__username">
            {usernameView ? `@${usernameView}` : ""}
          </p>
          <p>{bio}</p>
          <div className="social-links">
            {socialLinks.map((s, i) => {
              if (s?.includes("instagram")) {
                return (
                  <SlSocialInstagram
                    key={i}
                    onClick={() => {
                      window.open(s);
                    }}
                    size={25}
                    style={{ cursor: "pointer" }}
                  />
                );
              }
              if (s?.includes("facebook")) {
                return (
                  <SlSocialFacebook
                    key={i}
                    onClick={() => {
                      window.open(s);
                    }}
                    size={25}
                    style={{ cursor: "pointer" }}
                  />
                );
              }
              if (s?.includes("x.com") || s?.includes("twitter")) {
                return (
                  <SlSocialTwitter
                    key={i}
                    onClick={() => {
                      window.open(s);
                    }}
                    size={25}
                    style={{ cursor: "pointer" }}
                  />
                );
              }
              if (s?.includes("linkedin")) {
                return (
                  <SlSocialLinkedin
                    key={i}
                    onClick={() => {
                      window.open(s);
                    }}
                    size={25}
                    style={{ cursor: "pointer" }}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="block-perfil__options-feed">
        <div
          className={`block-perfil__option ${p}`}
          onClick={() => {
            setP("active-option");
            setL("deactivate-option");
            queryLked.current = false;
          }}
        >
          <MdPhotoSizeSelectActual
            size={25}
            className={`block-perfil__icon-photo`}
          />
        </div>
        <div
          onClick={() => {
            setL("active-option");
            setP("deactivate-option");
            queryLked.current = true;
          }}
          className={`block-perfil__option ${l}`}
        >
          <FaHeart className={`block-perfil__icon-heart`} size={25} />
          <p className="likes">Liked</p>
        </div>
      </div>
      <div className="block-perfil__photos-feed">
        <PhotosView user={queryUser.current} liked={queryLked.current} />
      </div>
    </div>
  );
}
