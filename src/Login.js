import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    axios.post('https://ejemplo-mi-sitio-react-phic.onrender.com/api/token/', { username, password })
      .then(res => {
        setToken(res.data.access);
        localStorage.setItem('access_token', res.data.access);
      })
      .catch(() => alert("Credenciales inválidas"));
  };

  return (
    <div className="container">
    <form onSubmit={handleLogin}>
      <h2>Iniciar sesión</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
  </div>
  );
}

export default Login;
