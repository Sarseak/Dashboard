import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndGetUser } from "../../services/Auth";
import saly from "../../assets/saly-14.svg";
import MeuGestor from "../../assets/MeuGestor.png";
import logo from "../../assets/logo.svg";
import Facebook from "../../assets/Facebook.svg";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
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

    <>
      <div><img className="logo" src={logo} alt="MeuGestorLogo" /></div>

      <div className="paginaLogin">

        <div className="containerEsquerdo">
          <div className="titulo">
            <h1>Faça seu login em</h1>
            <div className="MeuGestorText">
              <img src={MeuGestor} alt="MeuGestorimage" />
            </div>
            <p>Se você ainda não tem uma conta. <br /> Você pode se <a href="#">Registrar aqui !</a></p>
          </div>
          <img className="saly" src={saly} alt="personagem do login" />
        </div>

        <div className="containerDireito">
          <div className="conteudoCD">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
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

              <p className="link-esqueci-senha">
                <a href="#">Esqueceu sua senha?</a>
              </p>

              <button type="submit" className="botao-login" disabled={loading}>
                {loading ? "Entrando..." : "Login"}
              </button>

              <p
                className="mensagem-erro"
                style={{ visibility: error ? "visible" : "hidden", minHeight: "22px", }}
              >
                {error}
              </p>

            </form>

            <p className="MaisOpcoes">ou continue com</p>
            <div className="redesSociais">
              <a href="#"><img src={Facebook} alt="Login com Facebook" /></a>
              <a href="#"><img src={apple} alt="Login com Apple" /></a>
              <a href="#"><img src={google} alt="Login com Google" /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;