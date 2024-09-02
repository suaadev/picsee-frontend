/* eslint-disable no-unused-vars */
import NavBar from "../components/navbar/NavBar";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import UploadPhotos from "../components/photos/UploadPhotosModal";
import { useEffect, useState } from "react";

function Home() {
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const openUploadModal = () => {
    const localSession = window.sessionStorage.getItem("session");
    const session = localSession ? JSON.parse(localSession) : undefined;
    if (!session) {
      navigate("/forms/sign?o=u");
    } else {
      setVisibleUploadModal(true);
    }
  };
  useEffect(() => {
    console.log("pasa por aqui");
    const session = window.sessionStorage.getItem("session");
    if (searchParams.get("o") === "u") {
      if (!session) {
        alert("Debes iniciar sesion primero.");
      } else {
        setVisibleUploadModal(true);
      }
    }
  }, []);
  return (
    <>
      <div>
        <NavBar openUploadModal={openUploadModal} />
        {visibleUploadModal ? (
          <UploadPhotos visibleModel={setVisibleUploadModal} />
        ) : (
          <></>
        )}
        <Outlet />
      </div>
    </>
  );
}
export default Home;
