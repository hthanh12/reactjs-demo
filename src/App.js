import { useState } from 'react';
import './App.css';
import LoginForm from './component/LoginForm'
import ListOrder from './component/ListOrder'
import Header from './component/Header'
import DetailOrder from './component/DetailOrder'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("iws"))

  console.log("🚀 ~ file: App.js ~ line 6 ~ App ~ setAuth", auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={auth ? <><Header /><ListOrder /></> : <LoginForm />}
          />
          <Route
            path="/order"
            element={auth ? <><Header /><ListOrder /></> : <LoginForm />}
          />
          {/* The next line is very important for the Navigate component to work */}
          <Route
            path="/order/:id"
            element={auth ? <><Header /><DetailOrder /></> : <LoginForm />}
          />
          <Route
            path="/redirect"
            element={<Navigate to="/error-page" />}
          />
        </Routes>
      </BrowserRouter>

    </>
  );
}



export default App;
