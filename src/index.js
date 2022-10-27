import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AddPosts from './components/AddPosts.jsx';
import Posts from './components/Posts.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='mainbody'>
      <AddPosts />
    </div>
  </React.StrictMode>
);
