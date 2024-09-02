import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("session"));
    if (!user?.token) {
      navigate("/forms/sign");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
