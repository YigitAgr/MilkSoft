import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import MainPage from "./Page/MainPage.jsx";
import LoginPage from "./Page/LoginPage.jsx";
import HomePage from "./Page/HomePage.jsx";
import FarmsPage from "./Page/FarmsPage/FarmsPage.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import RegisterForm from "./Page/RegisterPage/RegisterUser.jsx";
import MyAssociationPage from "./Page/MyAssocition/MyAssociationPage.jsx";
import AssociationUserPage from "./Page/MyAssocition/AssociationUserPage.jsx";

function App() {

  return (
      <Router>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path ="/login" element={<LoginPage />} />
            <Route path={"/signup"} element={<RegisterForm />} />
            <Route path={"/home"} element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path={"/farms"} element={<ProtectedRoute><FarmsPage /></ProtectedRoute>} />
            <Route path={"/myassociation"} element={<ProtectedRoute><MyAssociationPage /></ProtectedRoute>} />
            <Route path={"/associationuser"} element={<ProtectedRoute><AssociationUserPage /></ProtectedRoute>} />
        </Routes>
      </Router>
  )
}

export default App
