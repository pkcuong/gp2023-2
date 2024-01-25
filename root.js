import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './login';
import Chat from './chat';
import Register from './register'
import './root.css';

function Root() {
    
        return (
          <BrowserRouter>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Login />}
                />
                <Route
                  exact
                  path="/chat"
                  element={<Chat />}
                />
                <Route
                  exact
                  path="/register"
                  element={<Register />}
                />
              </Routes>
          </BrowserRouter>
        )
      }
    
export default Root;