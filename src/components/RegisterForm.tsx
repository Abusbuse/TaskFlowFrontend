import { useState, FormEvent } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import api from '../api/axios'; // Importer l'instance axios configurée

const RegisterForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Chiffrer le mot de passe avant de l'envoyer
      const hashedPassword = await bcrypt.hash(password, 10);

      // Envoi de la requête POST pour enregistrer l'utilisateur
      const response = await api.post('/register', {
        name,
        email,
        password: hashedPassword,
      });
      console.log('Utilisateur enregistré:', response.data);
    } catch (error: unknown) {
      // Gérer les erreurs (par exemple, email déjà pris)
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.error ?? 'Une erreur est survenue');
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
        {/* bouton menant vers la page login */}
        <div>
          <a href="/login">Se connecter</a>
        </div>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default RegisterForm;