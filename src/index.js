import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from 'routes/Home';
import App from './components/App';
import firebase from './fbase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
