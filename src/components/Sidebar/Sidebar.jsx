// src/components/Sidebar/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.style.scss";

function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    // Limpar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirecionar para login
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <span>📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">
              <span>📦</span>
              <span>Produtos</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <span>📈</span>
              <span>Relatórios</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>⚙️</span>
              <span>Configurações</span>
            </a>
          </li>
          <li className="logout-item">
            <button onClick={handleLogout}>
              <span>🚪</span>
              <span>Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;