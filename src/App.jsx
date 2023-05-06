import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
  // Detail,
  // Home,
  // LandingPage,
  // Music,
  // Overview,
  // Profile,
  // RegisterLogin,
  // Start,
  // RemindMe
} from "./pages";
import './App.scss';
import ProtectedRoute from "./pages/ProtectedRoute";
import MusicDetail from "./pages/Music/MusicDetail";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading/Loading";


const RemindMe = lazy(() => import("./pages/RemindMe/RemindMe"))
const Detail = lazy(() => import("./pages/Detail/Detail"))
const Home = lazy(() => import("./pages/Home/Home"))
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"))
const Music = lazy(() => import("./pages/Music/Music"))
const Overview = lazy(() => import("./pages/Overview/Overview"))
const Profile = lazy(() => import("./pages/Profile/Profile"))
const RegisterLogin = lazy(() => import("./pages/RegisterLogin/RegisterLogin"))
const Start = lazy(() => import("./pages/Start/Start"))


function App() {

  return (
    <Router>
      <Suspense fallback={<Loading customStyle={{ position: "fixed", transform: "translate(-50%,-50%)", top: "50%", left: "50%" }} />}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" replace={true} />}></Route>
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
          <Route path="*" element={<Navigate to="/home" />}> </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
