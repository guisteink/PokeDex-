import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);