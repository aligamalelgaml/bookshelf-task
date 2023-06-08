import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header txt="hello there" />
  </React.StrictMode>
);

