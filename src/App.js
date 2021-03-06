import './App.css';
import APITest from './APITest/APITest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as React from 'react';

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE}>
      <Routes>
        <Route path="/" element={<APITest />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
