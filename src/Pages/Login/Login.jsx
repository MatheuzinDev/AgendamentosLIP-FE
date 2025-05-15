import Logo from "../../Components/Logo/Logo"
import FormLogin from "../../Components/FormLogin/FormLogin"
import FormRegistro from "../../Components/FormRegistro/FormRegistro"
import { useState } from "react"
import "../Login/Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const handleRegistroSuccess = () => {
    setIsLogin(true); // Alterna para o formulário de login
    alert('Registro realizado com sucesso!');
  };

  return (
    <div className="page-container">
      <Logo />
      <div className="form-container">
        <div className="toggle-container">
          <button 
            className={`toggle-button ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button
            className={`toggle-button ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Registrar
          </button>
        </div>
        
        {isLogin ? 
          <FormLogin /> : 
          <FormRegistro onSuccess={handleRegistroSuccess} />
        }
      </div>
    </div>
  );
}

export default Login;