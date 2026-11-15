import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- 1. Importer useNavigate
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // <-- 2. Initialiser la navigation

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Vérification du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      setLoading(true);

      // Envoyer les données au backend
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      // Vérifier la réponse du serveur
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      // Inscription réussie
      setSuccess("Inscription réussie ! Redirection en cours...");
      console.log("Utilisateur enregistré :", data.user);

      // 3. Stocker les infos de l'utilisateur dans le localStorage
      localStorage.setItem("user", JSON.stringify(data.user || formData));

      // 4. Rediriger vers le dashboard après un court délai (ou immédiatement)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <div className="register-bg"></div>
      <div className="register-overlay"></div>

      <header className="register-header">
        <a href="/" className="register-logo">
          🚗 Wass<span>elni</span>
        </a>

        <a href="/login" className="login-link">
          Déjà membre ? <strong>Connexion</strong>
        </a>
      </header>

      <main className="register-main">

        <div className="register-intro">
          <h1>Rejoignez Wasselni</h1>
          <p>
            Partagez vos trajets, économisez et voyagez ensemble en toute simplicité.
          </p>
        </div>

        <div className="register-card">

          <div className="form-heading">
            <h2>Créer un compte</h2>
            <p>Inscrivez-vous gratuitement en quelques étapes.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                name="fullName"
                placeholder="Ex : Firas Kaireddine"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="exemple@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+216 XX XXX XXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Minimum 8 caractères"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="8"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Répéter"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {error && (
              <p className="register-error">{error}</p>
            )}

            {success && (
              <p className="register-success">{success}</p>
            )}

            <label className="terms">
              <input type="checkbox" required />
              <span>
                J'accepte les conditions d'utilisation
                et la politique de confidentialité.
              </span>
            </label>

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "Créer mon compte →"}
            </button>

          </form>

          <div className="register-footer">
            Vous avez déjà un compte ?
            <a href="/login"> Se connecter</a>
          </div>

        </div>

      </main>

      <footer className="register-bottom">
        Wasselni © 2026 — Covoiturage Interurbain
      </footer>

    </div>
  );
}

export default Register;
