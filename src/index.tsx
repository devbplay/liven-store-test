import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./styles/variables.scss";
import "./styles/globals.scss";
import "./styles/layout.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
