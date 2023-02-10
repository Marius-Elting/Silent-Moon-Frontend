import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Detail, Home, LandingPage, Music, Overview, Profile, RegisterLogin, Start, RemindMe } from "./pages";
import './App.scss';



function App() {
  return (
    <Router>
      <Routes>
        <Route to="/" element={<LandingPage />}></Route>
        <Route to="/user/:action" element={<RegisterLogin />}></Route>
        <Route to="/remindme" element={<RemindMe />}></Route>
        <Route to="/start" element={<Start />}></Route>
        <Route to="/home" element={<Home />}></Route>
        <Route to="/detail/:type/:id" element={<Detail />}></Route>
        <Route to="/overview/:type" element={<Overview />}></Route>
        <Route to="/music" element={<Music />}></Route>
        <Route to="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
