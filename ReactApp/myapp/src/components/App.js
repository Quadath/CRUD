import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import RegisterPage from './auth/register-page/register-page';
import LoginPage from './auth/login-page/login-page';

import Posts from './posts/posts';
import PostForm from './post-form/post-form';
import PageSwitch from './page-switch/page-switch'
import HomePage from './homepage/homepage';
import './app.sass';

function App() {
  
  const [name, setName] = useState('Hi')
  const [posts, setPosts] = useState()
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);


  const apiURL = 'http://95.31.196.92:3000/notes'
  useEffect(() => {
    setIsLoading(true);
    
    const fetchPosts = () => {
      setIsLoading(true);

      axios.get(`${apiURL}?page=${page}`, {
        withCredentials : true
      }).then((response) => {
        setPosts(response.data.posts)
        setName(response.data.name)
      })
      setIsLoading(false)
    }
    if (!isLoading) {
      fetchPosts();
    }
  }, [page])


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
            <li>
              <Link to='notes'> Notes </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
            <Route path='/' exact element={<HomePage name={name}/>}/>
            <Route path="/auth/register" exact element={<RegisterPage/>}/>
            <Route path="/auth/login" exact element={<LoginPage/>}/>
            <Route path="/notes" element={
              <div style={{width: '40vw', margin: '0 auto'}}>
              <Posts posts={posts}></Posts>
              <PostForm/>
              <PageSwitch page={page} setPage={setPage}/>
              </div>
            }/>
          
        </Routes>
      </div>
    </Router>
  );
}



export default App;
