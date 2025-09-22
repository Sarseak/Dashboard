// src/components/Sidebar/Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.style.scss";
import {
  FaChartBar,
  FaShoppingCart,
  FaBox,
  FaTools,
  FaUser,
  FaBuilding,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";

import logo from "../../assets/logoMeuGestorSideBar.png";
import Chart from "../../assets/Chart.png"
import Buy from "../../assets/Buy.png"
import Document from "../../assets/Document.png"
import Chat from "../../assets/Chat.png"
import Setting from "../../assets/Setting.png"
import Profile from "../../assets/Profile.png"
import InfoSquare from "../../assets/Info Square.png"

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: <img src={Chart} alt="Carrinho de compras"/>, path: "/dashboard" },
    { label: "Vendas", icon: <img src={Buy} alt="Carrinho de compras"/>, path: "/vendas" },
    { label: "Produtos", icon: <img src={Document} alt="Carrinho de compras"/>, path: "/produtos" },
    { label: "Materiais", icon: <img src={Chat} alt="Carrinho de compras"/>, path: "/materiais" },
  ];

  const outrosItems = [
    { label: "Configurações", icon: <img src={Setting} alt="Carrinho de compras"/>, path: "/configuracoes" },
    { label: "Usuários", icon: <img src={Profile} alt="Carrinho de compras"/>, path: "/usuarios" },
    { label: "Empresa", icon: <img src={InfoSquare} alt="Carrinho de compras"/>, path: "/empresas" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo MeuGestor" />
        <h1>MeuGestor</h1>
      </div>
      <div className="sidebar-content">
        <nav className="sidebar-section">
          <h2 className="sidebar-title">Menu</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.label}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="sidebar-section">
          <h2 className="sidebar-title">Outros</h2>
          <ul>
            {outrosItems.map((item) => (
              <li
                key={item.label}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}

            <li className="logout" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Sair</span>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
