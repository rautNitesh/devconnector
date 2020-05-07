import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthLogin from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./action/authAction";
import { clearCurrentUser } from "./action/profileAction";

if (localStorage.jwtToken) {
  setAuthLogin(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const current = Date.now() / 1000;
  if (decoded.exp < current) {
    store.dispatch(clearCurrentUser());
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App spinner">
          <Navbar />

          <Route exact path="/" component={Layout} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
