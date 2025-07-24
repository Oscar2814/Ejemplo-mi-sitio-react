import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [tasks, setTasks] = useState([]);

  // Estados para login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Cargar tareas si hay token válido
  useEffect(() => {
    if (token) {
      axios.get('https://ejemplo-mi-sitio-react-phic.onrender.com/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error(err);
        logout();
      });
    }
  }, [token]);

  // Función para login
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://ejemplo-mi-sitio-react-phic.onrender.com/api/token/', { username, password })
      .then(res => {
        setToken(res.data.access);
        localStorage.setItem('access_token', res.data.access);
      })
      .catch(err => alert('Login fallido'));
  };

  // Función para logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem('access_token');
    setTasks([]);
    setUsername('');
    setPassword('');
  };

  if (!token) {
    // Mostrar formulario login
    return (
      <div className="App">
        <form onSubmit={handleLogin}>
        <h1>Hola desde Netlify con despliegue continuo</h1>

          <h2>Iniciar sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  // Mostrar tareas y botón logout
  return (
    <div className="App">
      <h1>Lista de Movies</h1>
      
      <ol>
        <li>Titulo: The Shawshank</li>
        <ul>
        <li>Synopsis: Un banquero injustamaemteLeer documentación de Django encarcelado forma una poderosa amiatad</li>
        <li>Duration: 142</li>
        <li>Genere: Drama</li>
        <li>Rating: 9.310</li>
        </ul>
        <li>Titulo: Parasite</li>
        <ul>
        <li>Synopsis: La historia gira en torno a la familia Kim, que vive en condiciones precarias en un semisótano.</li>
        <li>Duration: 142</li>
        <li>Genere: Drama</li>
        <li>Rating: 9.310</li>
        </ul>
        <li>Titulo: The Godfather</li>
        <ul>
        <li>Synopsis: La trama sigue la historia de la poderosa familia mafiosa Corleone, en la Nueva York de mediados del siglo XX</li>
        <li>Duration: 142</li>
        <li>Genere: Drama</li>
        <li>Rating: 9.310</li>
        </ul>
           {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
            ))}

      </ol>
      <center><button onClick={logout}>Cerrar sesión</button></center>
    </div>
  );
}

export default App;
