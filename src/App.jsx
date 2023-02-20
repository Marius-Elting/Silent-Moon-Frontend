import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Detail, Home, LandingPage, Music, Overview, Profile, RegisterLogin, Start, RemindMe } from "./pages";
import './App.scss';
import ProtectedRoute from "./pages/ProtectedRoute";
import MusicDetail from "./pages/Music/MusicDetail";
import { useDispatch } from "react-redux";
import { setRemindTime } from "./store/user-actions";
import { useEffect } from "react";



function App() {
  const dispatch = useDispatch();


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="remindme" element={<RemindMe />}></Route>
          <Route path="start" element={<Start />}></Route>
          <Route index path="home" element={<Home />}></Route>
          <Route path="detail/:type/:id" element={<Detail />}></Route>
          <Route path="overview/:type" element={<Overview />}></Route>
          <Route path="music" element={<Music />}></Route>
          <Route path="musicdetail/:id" element={<MusicDetail />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/landing" element={<LandingPage />}></Route>
        <Route path="/user/:action" element={<RegisterLogin />}></Route>
        <Route path="*" element={<Navigate to="/user/register" />}> </Route>
      </Routes>
    </Router>
  );
}

export default App;
