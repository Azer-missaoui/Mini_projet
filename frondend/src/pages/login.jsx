import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const carLogo = "https://cdn-icons-png.flaticon.com/512/741/741407.png";

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);

      // Appel de l'API de connexion du backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Identifiants incorrects.");
      }

      // Connexion réussie
      setSuccess("Connexion réussie ! Redirection...");
      
      // Stocker les informations de l'utilisateur dans le localStorage (nécessaire pour le Dashboard)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Rediriger vers le dashboard après 1 seconde
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError(err.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Arrière-plan global fixe */}
      <div className="bg-image-container"></div>
      <div className="bg-overlay"></div>

      {/* Header */}
      <header>
        <Link to="/" className="logo">
          <img src={carLogo} alt="Logo Wasselni" className="logo-img" />
          Wasselni
        </Link>
        <div className="header-auth">
          <Link to="/register" className="btn btn-outline btn-sm">S'inscrire</Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="login-container">
        <div className="login-top-title">
          <h2>Bon retour !</h2>
          <p>Connectez-vous pour accéder à vos trajets et gérer vos réservations.</p>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="identifier">E-mail ou Numéro de téléphone</label>
              <input
                type="text"
                id="identifier"
                placeholder="ex: exemple@gmail.com ou 29930214"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Affichage des messages d'erreur ou de succès */}
            {error && <p style={{ color: '#dc2626', fontSize: '0.88rem', marginTop: '-5px' }}>{error}</p>}
            {success && <p style={{ color: '#16a34a', fontSize: '0.88rem', marginTop: '-5px' }}>{success}</p>}

            <div className="form-actions-forgot">
              <a href="#forgot" className="forgot-link">Mot de passe oublié ?</a>
            </div>

            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="login-footer">
            <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}