import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(localStorage.getItem("token"));

  const handleLogin = (token, user) => { //this is used to set token
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/notes" /> : <Login setToken={handleLogin} />
        }
      />

      {/* Notes */}
      <Route
        path="/notes"
        element={
          token ? (
            <Notes token={token} user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to={token ? "/notes" : "/login"} />} />
    </Routes>
  );
}

export default App;
