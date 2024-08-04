import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import Broad from './pages/Broad';
import Broads from './pages/Broads';
import Login from './pages/Login';
import Register from './pages/Register';
import { RouterProvider } from './provider/router';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="broads" element={<Broads />} />
        <Route path="broads/:id" element={<Broad />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
