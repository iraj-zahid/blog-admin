import { useState, useEffect } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./View/Login/login";
import BlogForm from "./View/BlogForm/BlogForm";
import EditForm from "./Components/EditForm/EditForm";
import Dashboard from "./View/Dashboard/Dashboard";


function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("isAuthenticated"))
    if (userData) {
      setUser(userData)
    }
  }, [user])
  const ProtectedDash = (component) => {

    if (user) {
      if (!user.isAuthenticated) {
        return <Login />
      }
      else {
        return component
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ProtectedDash(<Dashboard />)} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogForm" element={<BlogForm />} />
        <Route path="/EditForm" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
