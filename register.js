import React, { Component,useEffect, useRef, useState } from 'react'
import { ReactDOM } from 'react-dom';
import './login.css';
import { BrowserRouter as router, Route, Routes, Link } from 'react-router-dom';
import Login from './login';
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        usernameRef.current.focus();
      }, []);
      const handleSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
          alert("Please fill all the fields");
          return;
        }
        const payload = {
          user: username,
          host: "gp2023.duckdns.org",
          password: password,
        };
    
        fetch("http://gp2023.duckdns.org:5280/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then((data) => {
            alert("User registered successfully");
            setUsername("");
            setPassword("");
          })
          .catch((error) => {
            alert("Error registering user");
            console.error(error);
          });
      };
  
  return (
    
        <section className="container forms">
                <div className="form sign">
                    <div className="form-content">
                        <header>Signup</header>
                        <form onSubmit={handleSubmit} >
                            <div className="field input-field">
                                <input type="name" placeholder="Username" className="input" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  ref={usernameRef}/>
                            </div>

                            <div className="field input-field">
                                <input type="password" placeholder="Create password" className="password" id="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef}/>
                                <i class='bx bx-hide eye-icon'></i>
                            </div>
                            <div className="field button-field">
                                <button>Register</button>
                            </div>
                        </form>

                        <div className="form-link">
                            <span>Already have an account? <Link to="/" className="link login-link">Login</Link></span>
                        </div>
                    </div>
                </div>
        </section>
    
    
  );
}

export default Register;
