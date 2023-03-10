import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../pages/api/consts";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, inputs);
    setCurrentUser(res.data);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
