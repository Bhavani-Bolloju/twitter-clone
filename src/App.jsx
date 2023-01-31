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
import NoMatch from "./pages/NoMatch";
import TweetsPage from "./pages/TweetsPage";
import TweetsAndReplies from "./pages/TweetsAndReplies";
import LikesPage from "./pages/LikesPage";

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
          <Route path={`/:id`} element={<ProfilePage />}>
            <Route index element={<TweetsPage />} />
            <Route path={`/:id/${routes.tweets}`} element={<TweetsPage />} />
            <Route path={`/:id/${routes.t_r}`} element={<TweetsAndReplies />} />
            <Route path={`/:id/${routes.likes}`} element={<LikesPage />} />
          </Route>
        </Route>
        <Route
          path={routes.signup}
          element={user ? <Navigate to={routes.home} /> : <SignupPage />}
        />
        <Route
          path={routes.signin}
          element={user ? <Navigate to={routes.home} /> : <LoginPage />}
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
