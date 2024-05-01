import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import MainPage from "./Page/MainPage.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import SignUpPage from "./Page/SignUpPage.jsx";
import HomePage from "./Page/HomePage.jsx";

function App() {

  return (
      <Router>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path ="/login" element={<LoginPage />} />
            <Route path={"/signup"} element={<SignUpPage />} />
            <Route path={"/home"} element={<HomePage />} />
        </Routes>
      </Router>
  )
}

export default App
