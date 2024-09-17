import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function UpdatePass() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const { resetPassword } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }
    if (newPassword.length < 9) {
      return setMessage("Password must be at least 9 characters long");
    }
    setLoader(true);

    resetPassword(
      (data, err) => {
        setLoader(false);
        if (err) {
          return setMessage(
            "Failed to update password, please try again."
          );
        }
        navigate("/forms/sign");
      },
      newPassword,
      searchParams.get("t")
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="container-form">
      <div className="header-form">
        <div className="text">Update Password</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <input
            id="login-password-input"
            onChange={(event) => setPassword(event.target.value)}
            className="form_sign__input-password input-form"
            type="password"
            placeholder="New password"
          />
        </div>
        <div className="input">
          <input
            id="login-password-input-2"
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="form_sign__input-password input-form"
            type="password"
            placeholder="Confirm new password"
          />
        </div>
        {message && (
          <div id="container_error" className="form-sign__container-error">
            {message}
          </div>
        )}
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            {loader ? (
              <span className="loader form-loader"></span>
            ) : (
              "Save New Password"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
