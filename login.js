import React, { Component, useState, } from 'react'
import { ReactDOM } from 'react-dom';
import './login.css';
import { BrowserRouter as router, useNavigate, Route, Routes, Link, } from 'react-router-dom';
import { client } from "@xmpp/client";


function Login() {
  const navigate = useNavigate()
  const Connect = (username, password) => {
    const xmpp = client({
      service: "ws://gp2023.duckdns.org:5280/ws", 
      domain: "gp2023.duckdns.org", 
      resource: "react-app", 
      username: username, 
      password: password, 
    });
    xmpp.on("online", (address) => {
      console.log("online as", address.toString())
      navigate("/chat", { state: { username, password } });
    });
  
    
    xmpp.on("error", (err) => {
      console.error("error", err);
      alert("Invalid name or password")
    });
  
    
    xmpp.start().catch(console.error);
    return () => {
      // Clean up the client instance and event listeners
      xmpp.stop();
    };
  };

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Connect(username, password);
  };
  return (
    
        <section className="container forms">
                <div className="form content">
                    <header>Login</header>
                    <form onSubmit={handleSubmit} >
                        <div className="field input-field">
                            <input type="text"    placeholder="Name" className="input"  name="username" value={username}  onChange={handleUsernameChange} required  ></input>
                        </div>
                        <div className="field input-field">
                            <input type="password"  placeholder="Password" className="password" name="password" value={password}  onChange={handlePasswordChange}  required  ></input>
                            
                        </div>
                        <div className="field button-field">
                            <button type='submit'>Login</button>
                        </div>
                        <div className="form-link">
                        <span>Don't have an account? <Link to="/register" className="link signup-link">Signup</Link></span>
                        </div>
                    </form>
                </div>
            
        </section>
    
    
  );
}

export default Login;
