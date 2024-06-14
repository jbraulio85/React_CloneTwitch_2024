/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../../shared/hooks";

const NavLogo = () => {
  return (
    <div className="nav-logo-container">
      <img
        className="nav-logo"
        width="100%"
        height="100%"
        src="https://i.ibb.co/9h0ZZfj/Escudo-Transparente.png"
        alt="Logo.svg"
      />
    </div>
  );
};

const NavButton = ({ text, onClickHandler }) => {
  return (
    <span className="nav-button" onClick={onClickHandler}>
      {text}
    </span>
  );
};

export const Nav = () => {
  const { isLogged, logout } = useUserDetails();

  const navigate = useNavigate()

  const handleNavigateToAuthPage = () => {
    navigate('/auth')
  }

  const handleNavigateToSettingsPage = () => {
    navigate('/settings')
  }

  const handleNavigateToChannelsPage = () => {
    navigate('/channels')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="nav-container">
      <NavLogo />
      <div className="nav-buttons-container">
        <NavButton text="Inicio" onClickHandler={handleNavigateToChannelsPage} />
        {!isLogged ? (
          <NavButton text="Iniciar Sesión" onClickHandler={handleNavigateToAuthPage} />
        ) : (
          <div>
            <NavButton text="Mi cuenta" onClickHandler={handleNavigateToSettingsPage} />
            <NavButton text="Cerrar Sesión" onClickHandler={handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
};
