const User = require("../models/User");
const bcrypt = require("bcrypt");

// Fonction d'Inscription (Register)
const register = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;

        // 1. Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // 2. Hasher le mot de passe
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 3. Créer et sauvegarder le nouvel utilisateur
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        await newUser.save();

        // 4. Répondre avec succès
        res.status(201).json({
            message: "Compte créé avec succès !",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (err) {
        console.error("Erreur serveur register:", err);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
};

// Fonction de Connexion (Login)
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body; // 'identifier' peut être l'email ou le téléphone

        if (!identifier || !password) {
            return res.status(400).json({ message: "Veuillez remplir tous les champs." });
        }

        // 1. Chercher l'utilisateur par email OU par téléphone
        const user = await User.findOne({
            $or: [{ email: identifier.trim() }, { phone: identifier.trim() }]
        });

        if (!user) {
            console.log("Utilisateur non trouvé pour l'identifiant :", identifier);
            return res.status(400).json({ message: "Email/Téléphone ou mot de passe incorrect." });
        }

        // --- TRACEUR DE DEBUG ---
        console.log("Mot de passe tapé :", password);
        console.log("Mot de passe hashé dans MongoDB :", user.password);

        // 2. Vérifier le mot de passe (comparaison avec le hash bcrypt)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Résultat de bcrypt.compare :", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Email/Téléphone ou mot de passe incorrect." });
        }

        // 3. Connexion réussie, on renvoie les infos de l'utilisateur
        res.status(200).json({
            message: "Connexion réussie !",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (err) {
        console.error("Erreur serveur login:", err);
        res.status(500).json({ message: "Erreur serveur lors de la connexion." });
    }
};

// --- TRÈS IMPORTANT : EXPORTER LES DEUX FONCTIONS ---
module.exports = { register, login };
