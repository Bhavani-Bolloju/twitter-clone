import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import * as routes from "./constants/route-paths";
import useAuth from "./components/hooks/use-auth";
import { AuthContext } from "./components/context/authContext";
import DashBoardPage from "./pages/DashBoardPage";
import HomePage from "./pages/HomePage";
import BookMarksPage from "./pages/BookMarksPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>
      <Routes>
        <Route
          path={routes.dashboard}
          element={user ? <DashBoardPage /> : <Navigate to={routes.signin} />}
        >
          <Route index element={<HomePage />} />
          <Route path={routes.bookMark} element={<BookMarksPage />} />
          <Route path={routes.home} element={<HomePage />} />
          <Route path={`/:id`} element={<ProfilePage />} />
        </Route>
        <Route
          path={routes.signup}
          element={user ? <Navigate to={routes.home} /> : <SignupPage />}
        />
        <Route
          path={routes.signin}
          element={user ? <Navigate to={routes.home} /> : <LoginPage />}
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

// <Route path="/" element={<DashBoardPage />}>
//           <Route path={routes.home} element={<HomePage />} />
//           <Route path={routes.bookMark} element={<BookMarksPage />} />
//           <Route path=":id" element={<ProfilePage />} />
//         </Route>
//         <Route path={routes.signup} element={<SignupPage />} />
//         <Route path={routes.signin} element={<LoginPage />} />
