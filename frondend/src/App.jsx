import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hello from './pages/Hello';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // <-- 1. Importer ton Dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* <-- 2. Ajouter la route vers le Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;