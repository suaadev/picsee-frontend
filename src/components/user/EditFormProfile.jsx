import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./editformprofile.css";

export default function EditFormProfile() {
  const [usernameView, setUsernameView] = useState("");
  const [bioEditView, setBioEdit] = useState("");
  const [avatarEditView, setUrlAvatarView] = useState("");
  const [firstNamesView, setFirstNamesView] = useState("");
  const [LastNamesView, setLastNamesView] = useState("");
  const [dateBornView, setDateBornView] = useState("");
  const [emailView, setEmailView] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [objectParams, setParams] = useState({});

  const navigate = useNavigate();
  const { updateUserInfo, updatePassword } = useUser();

  const handlerSendData = () => {
    if (Object.keys(objectParams).length === 0) {
      return alert("Please modify at least one field.");
    }
    updateUserInfo((data, error) => {
      if (error) {
        return alert(error);
      }
      alert("Profile updated successfully.");
    }, objectParams);
  };

  const handlerSendChangedPassword = () => {
    updatePassword(
      (data, error) => {
        if (error) {
          return alert(error);
        }
        alert("Password updated successfully.");
        setNewPassword("");
        setOldPassword("");
      },
      {
        oldPassword,
        newPassword,
      }
    );
  };

  useEffect(() => {
    const localUserInfo = window.sessionStorage.getItem("userInfo");
    if (!localUserInfo) {
      navigate("/");
      return;
    }
    const userDataInfo = JSON.parse(localUserInfo);
    setUsernameView(userDataInfo.username);
    setBioEdit(userDataInfo.bio || "");
    setFirstNamesView(userDataInfo.firstName || "");
    setLastNamesView(userDataInfo.lastName || "");
    setEmailView(userDataInfo.email || "");
    setUrlAvatarView(userDataInfo.urlAvatar || "");
    setSocialLinks(userDataInfo.socialLinks || "");
    setDateBornView(userDataInfo.dateBorn ? userDataInfo.dateBorn.split("T")[0] : "");
  }, []);

  return (
    <div className="container-edit-profile">
      <div className="form-edit-profile">
        <div className="forms">
          <div className="container-avatar">
            <div className="container-image">
              <img
                id="avatar_user"
                className="img-avatar loading"
                loading="lazy"
                src={avatarEditView}
                alt="Avatar"
              />
            </div>
            <div className="container_inputs_file">
              <label className="button-edit-profile" htmlFor="input_file">
                Upload
              </label>
              <div
                onClick={() => {
                  setParams({ avatar: "default" });
                  handlerSendData();
                }}
                className="delete-avatar"
              >
                Remove
              </div>
              <input
                id="input_file"
                type="file"
                className="input-field input-file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  const aux = objectParams;
                  aux.avatar = file;
                  setParams(aux);
                  const url = URL.createObjectURL(file);
                  document.getElementById("avatar_user").src = url;
                  setUrlAvatarView(url);
                }}
              />
            </div>
          </div>

          <div className="container-edit-info">
            <div className="container-input-width-label">
              <label htmlFor="input_bio">Bio</label>
              <textarea
                id="input_bio"
                value={bioEditView}
                className="input-field"
                placeholder="Tell us about yourself..."
                onChange={(event) => {
                  setBioEdit(event.target.value);
                  const aux = objectParams;
                  aux.bio = event.target.value;
                  setParams(aux);
                }}
              >
                {bioEditView}
              </textarea>
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_firstnames">First Name</label>
              <input
                id="input_firstnames"
                type="text"
                value={firstNamesView}
                className="input-field"
                placeholder="First Name"
                onChange={(event) => {
                  setFirstNamesView(event.target.value);
                  const aux = objectParams;
                  aux.firstName = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_lastnames">Last Name</label>
              <input
                id="input_lastnames"
                type="text"
                value={LastNamesView}
                className="input-field"
                placeholder="Last Name"
                onChange={(event) => {
                  setLastNamesView(event.target.value);
                  const aux = objectParams;
                  aux.lastName = event.target.value;
                  setParams(aux);
                }}
              />
            </div>

            <div className="container-input-width-label">
              <label htmlFor="input-birthday">Date of Birth</label>
              <input
                id="input-birthday"
                value={dateBornView}
                type="date"
                className="input-field"
                onChange={(event) => {
                  setDateBornView(event.target.value);
                  const aux = objectParams;
                  aux.dateBorn = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_username">Username</label>
              <input
                disabled
                id="input_username"
                type="text"
                className="input-field"
                value={usernameView}
                placeholder="Username"
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_email">Email</label>
              <input
                id="input_email"
                type="email"
                className="input-field"
                disabled
                value={emailView}
                placeholder="Email address"
              />
            </div>
            <div className="container-input-width-label">
              <label htmlFor="input_links">Social Links</label>
              <textarea
                id="input_links"
                value={socialLinks}
                placeholder="Links separated by comma, e.g. https://instagram.com/user,https://x.com/user"
                className="input-field"
                onChange={(event) => {
                  setSocialLinks(event.target.value);
                  const aux = objectParams;
                  aux.socialLinks = event.target.value;
                  setParams(aux);
                }}
              />
            </div>
            <div className="button-edit-profile" onClick={handlerSendData}>
              Update Profile
            </div>
          </div>

          <div className="container-edit-password">
            <hr className="container-edit-border" />
            <p>Change Password</p>
            <input
              type="password"
              className="input-field"
              value={oldPassword}
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
              placeholder="Current password"
            />
            <input
              type="password"
              value={newPassword}
              className="input-field"
              placeholder="New password"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />

            <div
              id="button_change_password"
              className="button-edit-profile"
              onClick={handlerSendChangedPassword}
            >
              Change Password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
