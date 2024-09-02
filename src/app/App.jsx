import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormsView from "../components/forms/FormsView";
import Signup from "../components/forms/Signup";
import Sign from "../components/forms/Sign";
import Home from "../pages/Home";
import RecoverPass from "../components/forms/RecoverPass";
import UpdatePass from "../components/forms/UpdatePass";
import MainView from "../components/mainview/MainView";
import { UserContextProvider } from "../context/userContext";
import PerfilView from "../components/user/PerfilView";
//import ProtectedRoute from "../utils/ProtectedRoute";
import "./app.css";
import EditFormProfile from "../components/user/EditFormProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <MainView />,
      },

      {
        path: "/perfil/:userQuery",
        element: <PerfilView />,
      },

      {
        path: "/perfil/edit",
        element: <EditFormProfile />,
      },
    ],
  },
  {
    path: "/forms",
    element: <FormsView />,
    children: [
      { path: "sign", element: <Sign /> },
      { path: "signup", element: <Signup /> },
      { path: "recoverpass", element: <RecoverPass /> },
      { path: "newpass", element: <UpdatePass /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
