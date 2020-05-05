import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Route exact path="/" component={Layout} />
        <div className="container">
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
