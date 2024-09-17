import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./forms.css";

function Sign() {
  const [user, setUser] = useState("");
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { sign } = useUser();

  const signHandler = () => {
    setErrorMessage("");
    if (user.trim() === "" || password.trim() === "") {
      return setErrorMessage("Please fill in all required fields");
    }
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }

        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate(`/?${searchParams.toString()}`);
      },
      { user, password }
    );
  };

  const signGooglePlatform = (credentials) => {
    setErrorMessage("");
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setErrorMessage(err);
        }

        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        navigate("/");
      },
      credentials,
      true
    );
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="container-form">
        <div className="header-form">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <input
              id="login-username-input"
              onChange={(event) => setUser(event.target.value)}
              className="form_sign__input-username input-form"
              type="text"
              placeholder="Username or email"
            />
          </div>

          <div className="input">
            <input
              id="login-password-input"
              onChange={(event) => setPassword(event.target.value)}
              className="form_sign__input-password input-form"
              type="password"
              placeholder="Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") signHandler();
              }}
            />
          </div>
          {errorMessage && (
            <div id="container_error" className="form-sign__container-error">
              {errorMessage}
            </div>
          )}

          <div className="forgot-password">
            <span
              onClick={() => navigate("/forms/recoverpass")}
              style={{ cursor: "pointer" }}
            >
              Forgot your password?
            </span>
          </div>

          <div className="submit-container">
            <div className="submit" onClick={signHandler}>
              {loader ? (
                <span className="loader form-loader"></span>
              ) : (
                "Sign In"
              )}
            </div>

            <div className="submit" onClick={() => navigate("/forms/signup")}>
              <b>Sign Up here</b>
            </div>
          </div>

          <div className="container__google-login">
            <GoogleLogin
              className="button-google"
              onSuccess={(response) => {
                signGooglePlatform(response);
              }}
              onError={() => {
                alert("Google login failed");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign;
