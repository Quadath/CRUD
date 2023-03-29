import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import RegisterPage from './auth/register-page/register-page';
import LoginPage from './auth/login-page/login-page';

// import Posts from './posts/posts';
// import PostForm from './post-form/post-form';
// import PageSwitch from './page-switch/page-switch'
import './app.sass';

function App() {
  const [posts, setPosts] = useState()
  const [page, setPage] = useState(1)

  const apiURL = 'http://95.31.196.92:3000/notes'
  useEffect(() => {
    axios.get(`${apiURL}?page=${page}`).then(response => {
      const data = response.data;
      setPosts(data)
    })
  }, [setPosts, page])


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="auth/register">Register</Link>
            </li>
            <li>
              <Link to="auth/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
            <Route path="/auth/register" exact element={<RegisterPage/>}/>
            <Route path="/auth/login" exact element={<LoginPage/>}/>
            
          {/* <Route path="/" exact element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/users" element={<Users/>}/> */}
          
        </Routes>
      </div>
    </Router>
  );
}



export default App;
