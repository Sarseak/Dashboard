// src/App.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './styles/global.scss';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Produto from './pages/Produto/Produto';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route path='/products' element={
            <ProtectedRoute>
              <Produto/>
            </ProtectedRoute>
          }/>
          <Route path='/' element={<Navigate to="/dashboard"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;