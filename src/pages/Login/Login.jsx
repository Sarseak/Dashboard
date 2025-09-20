import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndGetUser } from "../../services/Auth";
import saly from "../../assets/saly-14.svg";
import apple from "../../assets/apple.svg";
import Facebook from "../../assets/Facebook.svg";
import google from "../../assets/google.svg";
import Logo from "../../assets/logo.svg";
import MeuGestor from "../../assets/MeuGestor.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.style.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Função para validar email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validações
    if (!email.trim() || !senha.trim()) {
      setError("Preencha todos os campos");
      return;
    }
    
    if (!isValidEmail(email)) {
      setError("Por favor, insira um email válido");
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      const response = await loginAndGetUser({ email, password: senha });
      
      // Verifica se temos um usuário e token
      if (response.user && response.token) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        setError("Login falhou. Verifique suas credenciais.");
      }
      
    } catch (err) {
      console.error("Erro no login:", err);
      
      // Tratamento de erro melhorado
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pagina">
      <div className="container-principal">
        <div className="area-esquerda">
          <div className="logo-container">
            <img src={Logo} className="logo" alt="Logo" />
          </div>

          <div className="texto-esquerda">
            <h1 className="titulo">
              <b>Faça seu Login em</b>
            </h1>
            <h2 className="subtitulo">
              <img src={MeuGestor} alt="Meu Gestor" />
            </h2>
            <p className="descricao">
              Se você ainda não tem uma conta
              <br />
              Você pode se <a href="/register">registrar aqui</a>
            </p>
          </div>

          <img src={saly} alt="Ilustração" className="imagem-personagem" />
        </div>

        <div className="area-direita">
          <div className="caixa-login">
            <h3 className="titulo-form">Login</h3>

            <form onSubmit={handleSubmit} className="formulario-login">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="campo-texto"
              />
              <div className="campo-senha">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="campo-texto"
                />
                <span
                  className="icone-olho"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {error && <p className="mensagem-erro">{error}</p>}
              
              <p className="link-esqueci-senha">
                <a href="/forgot-password">Esqueceu sua senha?</a>
              </p>

              <button type="submit" className="botao-login" disabled={loading}>
                {loading ? "Entrando..." : "Login"}
              </button>

              <p className="texto-ou">ou continue com</p>

              <div className="area-redes">
                <img src={Facebook} alt="Facebook" className="icone-rede" />
                <img src={apple} alt="Apple" className="icone-rede" />
                <img src={google} alt="Google" className="icone-rede" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;