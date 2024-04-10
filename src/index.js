import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthProvider from './components/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider isSignedIn={false}>
  <BrowserRouter>
   
    <Routes> 
        <Route path="/*" element={<App/>}/>
    </Routes>
   
  </BrowserRouter>
  </AuthProvider>
);


