/* eslint-disable react/prop-types */
const logo = "https://i.ibb.co/9h0ZZfj/Escudo-Transparente.png";

export const Logo = ({ text }) => {
  return (
    <div className="auth-form-logo-container">
      <img 
        src={logo} 
        alt="Escudo" 
        style={{
          width: '35px', // Ajusta esto a la anchura que desees
          height: '35px', // Ajusta esto a la altura que desees
        }}
      />
      <span>&nbsp;&nbsp;{text}</span>
    </div>
  );
};

