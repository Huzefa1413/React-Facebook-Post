import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AddPosts from './components/AddPosts.jsx';
import Navbar from './components/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <Navbar />
      <AddPosts />
    </div>
  </React.StrictMode>
);
