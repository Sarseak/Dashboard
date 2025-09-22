// src/components/Header/Header.jsx
import { useEffect, useState } from "react";
import "./Header.style.scss";
import { PiHamburgerDuotone } from "react-icons/pi";
import { FaUserLarge } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name || "Usuário");
    }
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <FaUserLarge className="avatar" />
        <h1 className="greeting">Olá, {username}</h1>
      </div>

      <div className="header-search">
        <input type="text" placeholder="Buscar..." />
        <IoSearch className="search-icon" />
      </div>

      <div className="header-actions">
        <div className="company-select">
          <button className="company-button">
            <PiHamburgerDuotone />
          </button>
          <span>Red Container</span>
          <IoIosArrowDown className="arrow-icon" />
        </div>

        <div className="notifications">
          <FaRegBell className="bell-icon" />
          <span className="notification-dot"></span>
        </div>
      </div>
    </header>
  );
}

export default Header;
