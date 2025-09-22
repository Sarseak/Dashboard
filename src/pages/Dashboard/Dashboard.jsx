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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
