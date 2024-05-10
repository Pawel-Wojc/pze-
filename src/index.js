import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { QueryClient, QueryClientProvider } from 'react-query'


import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  
    <Routes> 
        <Route path="/*" element={<QueryClientProvider client={new QueryClient()}><App/> </QueryClientProvider>}/>
    </Routes>
  </BrowserRouter>
);


