// src/pages/Dashboard/Dashboard.jsx
import "./Dashboard.style.scss";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-content">
        <div className="content-wrapper">
          <h1>Dashboard</h1>
          <p>Bem-vindo ao painel de controle do MeuGestor!</p>
          
          <div className="stats-cards">
            <div className="stat-card">
              <h3>Total de Produtos</h3>
              <span className="stat-number">0</span>
              <span className="stat-description">Em estoque</span>
            </div>
            
            <div className="stat-card">
              <h3>Vendas do Mês</h3>
              <span className="stat-number">R$ 0,00</span>
              <span className="stat-description">Receita total</span>
            </div>
            
            <div className="stat-card">
              <h3>Pedidos</h3>
              <span className="stat-number">0</span>
              <span className="stat-description">Este mês</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;