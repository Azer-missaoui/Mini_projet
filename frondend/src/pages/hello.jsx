import React from 'react';
import { Link } from 'react-router-dom';
import './Hello.css';

const carLogo = "https://cdn-icons-png.flaticon.com/512/741/741407.png";

export default function Hello() {
  return (
    <div className="hello-page">
      {/* Arrière-plan avec image fixe et voile sombre */}
      <div className="bg-image-container"></div>
      <div className="bg-overlay"></div>

      {/* Header */}
      <header>
        <Link to="/" className="logo">
          <img
            src={carLogo}
            alt="Logo Wasselni"
            className="logo-img"
          />
          Wasselni
        </Link>
        <div className="header-auth">
          <Link to="/login" className="btn btn-outline btn-sm">Connexion</Link>
          <Link to="/register" className="btn btn-sm">S'inscrire</Link>
        </div>
      </header>

      {/* Hero Section en 2 colonnes */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            <img src={carLogo} alt="" className="badge-car-icon" /> Covoiturage interurbain
          </span>
          <h1>Voyagez malin, partout et ensemble</h1>
          <p>
            Plateforme de covoiturage interurbain sécurisée pour tous vos déplacements 
            (Tunis, Sfax, Gabès, Monastir, Sousse, Médenine...). Une solution simple, 
            économique et conviviale pour partager la route au quotidien ou le week-end.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-hero">
              Commencer l'aventure
            </Link>
            <Link to="/login" className="btn btn-outline btn-hero">
              J'ai déjà un compte
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"
            alt="Voyage en covoiturage sur la route"
            className="hero-image"
          />
          <div className="floating-card">
            <span className="floating-icon">✨</span>
            <div>
              <strong>Trajets vérifiés</strong>
              <p>Conducteurs et passagers fiables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation des principes clés de l'application */}
      <main className="container">
        <div className="rules-grid">
          <div className="rule-card">
            <div className="rule-icon">🔒</div>
            <h3>Anti-Chevauchement</h3>
            <p>
              Le système bloque automatiquement la réservation de deux trajets simultanés ou aux
              horaires superposés pour un même passager, garantissant une organisation sans stress.
            </p>
          </div>
          <div className="rule-card">
            <div className="rule-icon">⚖️</div>
            <h3>Gestion Stricte des Places</h3>
            <p>
              Impossibilité absolue de réserver au-delà du quota maximum fixé par le conducteur. 
              Libération instantanée des places en cas de désistement.
            </p>
          </div>
          <div className="rule-card">
            <div className="rule-icon">🔄</div>
            <h3>Rôles Hybrides</h3>
            <p>
              Un profil unique permettant de basculer en un clic entre le rôle de passager 
              recherchant un trajet et de conducteur publiant ses places disponibles.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}