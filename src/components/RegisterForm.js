import { useState } from 'react';
import api from '../api/axios'; // Importer l'instance axios configurée

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Envoi de la requête POST pour enregistrer l'utilisateur
      const response = await api.post('/register', {
        name,
        email,
        password,
      });
      console.log('Utilisateur enregistré:', response.data);
    } catch (error) {
      // Gérer les erreurs (par exemple, email déjà pris)
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Une erreur est survenue');
      }
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default RegisterForm;
