import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/"); // Redirige si déjà connecté
    }
  }, [navigate]);

  return (
    <div>
      <h1>Se connecter</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
