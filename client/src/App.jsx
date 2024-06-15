import { useState, useEffect, createContext, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SingleQuestion from "./pages/SingleQuestion/SingleQuestion";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

export const AppState = createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const currentPath = window.location.pathname;

  const checkUser = useCallback(async () => {
    if (currentPath === "/register") {
      return;
    }

    try {
      const { data } = await axios.get("/api/users/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, [navigate, currentPath]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/question/:questionId" element={<SingleQuestion />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
