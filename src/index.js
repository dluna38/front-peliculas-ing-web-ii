import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import App from './App';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

axios.defaults.baseURL=process.env.REACT_APP_BASE_URL_BACKEND || "";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
  </React.StrictMode>
);

