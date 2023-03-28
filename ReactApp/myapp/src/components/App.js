import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Posts from './posts/posts';
import PostForm from './post-form/post-form';
import PageSwitch from './page-switch/page-switch'
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
    <div className="app">
      <div>
        <PostForm/>
        <Posts posts={posts}/>
        <PageSwitch page={page} setPage={setPage}/>
      </div>
    </div>
  );
}

export default App;
