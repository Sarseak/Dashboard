import { useState } from "react";

export function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione sua lógica de login aqui
    console.log("Login:", login);
    console.log("Senha:", senha);
    // Exemplo: fazer uma requisição para a API
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}