import React from 'react';
import { useLogout } from '../hooks/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ user }) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page based on route
  const getCurrentPage = () => {
    if (location.pathname === '/trips/user/me') return 'personal';
    if (location.pathname === '/' || location.pathname === '/dashboard') return 'home';
    return '';
  };

  const handleMenuChange = (e) => {
    const value = e.target.value;

    if (value === "logout") {
      logout();
    } else if (value === "personal") {
      navigate("/trips/user/me");
    } else if (value === "home") {
      navigate("/");
    }
  };

  return (
    <header>
      {user && (
        <div className="menu">
          <select
            value={getCurrentPage()}
            onChange={handleMenuChange}
          >
            <option value="">☰ Menu</option>
            <option value="personal">Personal Dashboard</option>
            <option value="home">Homepage</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      )}
      <h1>Batutta Board</h1>
    </header>
  );
}

export default Header;