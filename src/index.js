import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Ads from './routes/ads';
import AdDetails from './components/AdDetails';
import AdPage from './components/AdPage';
import AdEdit from './components/AdEdit';
import AdNew from './components/AdNew';

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={<Navigate to='/ads' replace />} />
        <Route path='/ads/' element={<Ads />}>
          <Route path='' element={<AdPage />} />
          <Route path=':id' element={<AdDetails />} />
          <Route path=':id/edit' element={<AdEdit />} />
          <Route path='new' element={<AdNew />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
