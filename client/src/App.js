import './public/css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './components/Homepage/index';
import Login from './components/Login/index';
import Dashboard from './components/Dashboard';
import Trends from './components/Dashboard/Trends';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
      <Route path="/dashboard/trends" element={<Trends />} />
    </Routes>
    </Router>
  );
}

export default App;
