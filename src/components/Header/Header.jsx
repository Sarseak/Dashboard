// src/components/Header/Header.jsx
import { useEffect, useState } from "react";
import "./Header.style.scss";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Buscar dados do usuário do localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <h1 className="logo">MeuGestor</h1>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar..." />
          <button>🔍</button>
        </div>
      </div>
      
      <div className="header-right">
        <div className="notifications">
          <span>🔔</span>
        </div>
        <div className="user-info">
          {user ? (
            <>
              <span className="user-name">{user.name || user.email}</span>
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <span>Usuário</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;