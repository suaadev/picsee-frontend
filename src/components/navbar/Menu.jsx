import { useEffect } from "react";
import "./menu.css";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Menu({ closeMenu, username }) {
  const navigate = useNavigate();
  useEffect(() => {});
  return (
    <div className="nav-bar__block-menu block-menu">
      <ul className="block-menu__list">
        <li
          onClick={() => {
            closeMenu();
            navigate(`/perfil/${username}`);
          }}
          className="block-menu__item item-perfil"
        >
          Profile
        </li>
        <hr />
        <li
          onClick={() => {
            window.sessionStorage.removeItem("session");
            window.sessionStorage.removeItem("userInfo");
            window.location.reload();
          }}
          className="block-menu__item item-logout"
        >
          Log Out
        </li>
      </ul>
    </div>
  );
}
