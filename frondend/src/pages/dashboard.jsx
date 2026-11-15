import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

// Les 24 gouvernorats (wilayas) de Tunisie
const TUNISIAN_GOVERNORATES = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", 
    "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kébili", 
    "Le Kef", "Mahdia", "La Manouba", "Médenine", "Monastir", 
    "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", 
    "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [searchData, setSearchData] = useState({
        departure: "",
        arrival: "",
        date: "",
        passengers: "1 passager"
    });
    
    const navigate = useNavigate();

    // Date minimale pour empêcher de choisir une date passée (format YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleSearchChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search-ride?from=${searchData.departure}&to=${searchData.arrival}&date=${searchData.date}&passengers=${searchData.passengers}`);
    };

    if (!user) {
        return <div className="dashboard-loading">Chargement...</div>;
    }

    return (
        <div className="dashboard-page">
            {/* Arrière-plan et voile sombre */}
            <div className="dashboard-bg"></div>
            <div className="dashboard-overlay"></div>
            
            {/* --- HEADER --- */}
            <header className="dashboard-header">
                <div className="header-left">
                    <a href="/dashboard" className="dashboard-logo">
                        🚗 Wassel<span>ni</span>
                    </a>
                </div>

                <div className="header-right">
                    <span className="welcome-badge">
                        👋 Bonjour, <strong>{user.fullName}</strong>
                    </span>
                    
                    <button 
                        onClick={() => navigate("/publish-ride")} 
                        className="btn-publish-nav"
                    >
                        ➕ Proposer un trajet
                    </button>

                    <button onClick={handleLogout} className="btn-logout">
                        Déconnexion
                    </button>
                </div>
            </header>

            {/* --- HERO SECTION & BARRE DE RECHERCHE --- */}
            <main className="dashboard-main">
                <div className="hero-section">
                    <div className="hero-text">
                        <h1>Où souhaitez-vous aller, <span>{user.fullName.split(" ")[0]}</span> ?</h1>
                        <p>Trouvez un covoiturage économique ou publiez votre trajet en toute simplicité.</p>
                    </div>

                    {/* Barre de recherche style BlaBlaCar (Centrée et lisible) */}
                    <form className="search-bar-container" onSubmit={handleSearchSubmit}>
                        <div className="search-field">
                            <span className="field-icon">📍</span>
                            <div className="field-content">
                                <label>Départ</label>
                                <select 
                                    name="departure"
                                    value={searchData.departure}
                                    onChange={handleSearchChange}
                                    required
                                >
                                    <option value="" disabled>Sélectionner une ville</option>
                                    {TUNISIAN_GOVERNORATES.map((gov) => (
                                        <option key={gov} value={gov}>{gov}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="search-divider"></div>

                        <div className="search-field">
                            <span className="field-icon">🎯</span>
                            <div className="field-content">
                                <label>Arrivée</label>
                                <select 
                                    name="arrival"
                                    value={searchData.arrival}
                                    onChange={handleSearchChange}
                                    required
                                >
                                    <option value="" disabled>Sélectionner une ville</option>
                                    {TUNISIAN_GOVERNORATES.map((gov) => (
                                        <option key={gov} value={gov}>{gov}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="search-divider"></div>

                        <div className="search-field">
                            <span className="field-icon">📅</span>
                            <div className="field-content">
                                <label>Date</label>
                                <input 
                                    type="date" 
                                    name="date"
                                    min={today}
                                    value={searchData.date}
                                    onChange={handleSearchChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="search-divider"></div>

                        <div className="search-field">
                            <span className="field-icon">👤</span>
                            <div className="field-content">
                                <label>Passagers</label>
                                <select name="passengers" value={searchData.passengers} onChange={handleSearchChange}>
                                    <option value="1 passager">1 passager</option>
                                    <option value="2 passagers">2 passagers</option>
                                    <option value="3 passagers">3 passagers</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="search-submit-btn">
                            Rechercher un trajet
                        </button>
                    </form>
                </div>

                {/* --- CARTES D'ACTIONS (Conducteur / Passager) --- */}
                <div className="quick-actions-grid">
                    <div className="action-card publish-action-card">
                        <div className="card-badge">Conducteur</div>
                        <h3>Vous voyagez en voiture ?</h3>
                        <p>Partagez vos frais de route en proposant vos places libres à d'autres voyageurs.</p>
                        <button onClick={() => navigate("/publish-ride")} className="card-btn btn-green">
                            Publier un trajet 🚗
                        </button>
                    </div>

                    <div className="action-card search-action-card">
                        <div className="card-badge">Passager</div>
                        <h3>Besoin de vous déplacer ?</h3>
                        <p>Recherchez un trajet parmi des milliers de conducteurs et réservez votre place en un clic.</p>
                        <button onClick={() => {
                            const section = document.querySelector('.hero-section');
                            if(section) section.scrollIntoView({ behavior: 'smooth' });
                        }} className="card-btn btn-blue">
                            Chercher un trajet 🔍
                        </button>
                    </div>
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="dashboard-footer">
                <p>Wasselni © 2026 — Covoiturage Interurbain</p>
            </footer>
        </div>
    );
}