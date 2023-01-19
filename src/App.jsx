import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import * as routes from "./constants/route-paths";
import useAuth from "./components/hooks/use-auth";
import { AuthContext } from "./components/context/authContext";

function App() {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>
      <Routes>
        <Route path="/" element={<p>dashboard</p>}></Route>
        <Route path={routes.signup} element={<SignupPage />}></Route>
        <Route path={routes.signin} element={<LoginPage />}></Route>
        <Route path={routes.home} element={<HomePage />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
