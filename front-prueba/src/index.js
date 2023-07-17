import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/styles.scss';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Se comenta para evitar el renderizado doble, solo en Dev
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

