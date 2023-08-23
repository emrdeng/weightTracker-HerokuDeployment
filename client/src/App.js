import './public/css/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate
} from "react-router-dom";
import HomePage from './components/Homepage/index';
import Login from './components/Login/index';
import Dashboard from './components/Dashboard';
import Trends from './components/Dashboard/Trends';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("https://weight-tracker-diary-2dad58c2fcb4.herokuapp.com/auth/login/success", {
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
      {/* <PrivateRoute path="/dashboard" element={<Dashboard />} user={user} />
      <PrivateRoute path="/dashboard/trends" element={<Trends />} user={user} /> */}
      {/* {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/trends" element={<Trends />} />
        </>
      ) : (
        <Route path="/dashboard" element={<Login />} />
      )} */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
      <Route path="/dashboard/trends" element={<Trends />} />
    </Routes>
    </Router>
  );
}

// function PrivateRoute({ user, ...rest }) {
//   if (user) {
//     return <Route {...rest} />;
//   }
//   return <Route path="*" element={<Navigate to="/Login" replace />} />;
// }

// export default App;
