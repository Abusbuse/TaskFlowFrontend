import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: { 'Content-Type': 'application/json'}
});

// Ajouter un intercepteur pour injecter le token dans les requêtes
api.interceptors.request.use(
    (config) => {
      // Récupérer le token JWT du stockage local
      const token = localStorage.getItem('token');
      if (token) {
        // Si un token existe, on le rajoute dans l'en-tête Authorization
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;  // Retourner la configuration modifiée de la requête
    },
    (error) => {
      // Si une erreur se produit, retourner la promesse rejetée
      return Promise.reject(error);
    }
);
  

export default api;