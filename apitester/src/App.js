import './App.css';
import APITest from './APITest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<APITest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
