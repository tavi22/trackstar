import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FoldersProvider } from './components/contexts/FoldersContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FoldersProvider>
        <App />
      </FoldersProvider>
    </BrowserRouter>
  </React.StrictMode>
);