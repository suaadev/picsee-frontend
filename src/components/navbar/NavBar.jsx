import { useEffect, useState } from "react";
import "./navbar.css";

import { IoIosSearch } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "./Menu";

// eslint-disable-next-line react/prop-types
function NavBar({ openUploadModal }) {
  const [search, setSearch] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [userDataInfo, setUserDataInfo] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    setSearch("");
    const sessionLocalStorage = window.sessionStorage.getItem("session");
    if (!userDataInfo && sessionLocalStorage) {
      const session = JSON.parse(sessionLocalStorage);
      setUserDataInfo({
        urlAvatar: session.urlAvatar,
        username: session.username,
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <header className="nav-bar">
        <NavLink to={"/"} className="nav-bar__container-app-icon">
          <img
            src="https://ik.imagekit.io/picmont/icons/sendPic.png?updatedAt=1687206842790"
            className="nav-bar__app-icon"
            alt="Picsee"
          />
        </NavLink>

        <NavLink to={"/"} className="nav-bar__app-name nav-link">
          <p>Picsee</p>
        </NavLink>

        <div className="nav-bar__container-search">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`?q=${search}`);
              }
            }}
            className="nav-bar__input-search"
            type="search"
            placeholder="Search photos, tags, creators..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IoIosSearch
            className="nav-bar_icon_search"
            onClick={() => {
              navigate(`?q=${search}`);
            }}
          />
        </div>
        <div className="nav-bar__menu menu">
          <ul className="menu__list-items">
            <li className="menu__item-about item">
              <div
                onClick={() => {
                  openUploadModal();
                }}
                className="menu__btn-upload-post nav-link"
              >
                Upload
              </div>
            </li>

            {!userDataInfo ? (
              <li className="menu__item-about item">
                <NavLink
                  className="menu__btn-login nav-link"
                  to={"/forms/sign"}
                >
                  Sign In
                </NavLink>
              </li>
            ) : (
              <li className="menu__item-avatar item">
                <div className="nav-bar__container-avatar">
                  <img
                    id="avatar"
                    onClick={() => {
                      setVisibleMenu(!visibleMenu);
                    }}
                    className="nav-bar__avatar"
                    src={userDataInfo?.urlAvatar}
                    alt="User Avatar"
                  />
                </div>
              </li>
            )}
          </ul>
          {visibleMenu ? (
            <Menu
              username={userDataInfo.username}
              closeMenu={() => {
                setVisibleMenu(false);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </header>
    </>
  );
}

export default NavBar;
