import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layouts from "./pages/Layouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import DashBoard from "./pages/DashBoard";
import { useSelector } from "react-redux";
function App() {
  const { token } = useSelector((state) => state.auth);
  // console.log("App", token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="login"
              element={!token ? <LoginReg /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/user/reset/:id/:token"
              element={<ResetPassword />}
            />
          </Route>
          <Route
            path="/dashboard"
            element={token ? <DashBoard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h1>Error 404 Page not Found !! </h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
