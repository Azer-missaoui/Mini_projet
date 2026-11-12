
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            university,
            password,
            confirmPassword,
            role
        } = req.body;

        // 1. Vérifier les champs obligatoires
        if (
            !fullName ||
            !email ||
            !phone ||
            !university ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 2. Vérifier l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const normalizedEmail = email.trim().toLowerCase();

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        // 3. Vérifier la longueur du mot de passe
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters"
            });
        }

        // 4. Vérifier la confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        // 5. Vérifier si l'email existe
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // 6. Vérifier le rôle
        const userRole = role || "both";

        if (!["driver", "passenger", "both"].includes(userRole)) {
            return res.status(400).json({
                message: "Invalid user role"
            });
        }

        // 7. Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // 8. Créer et enregistrer l'utilisateur
        const user = await User.create({
            fullName,
            email: normalizedEmail,
            phone,
            university,
            password: hashedPassword,
            role: userRole
        });

        // 9. Retourner une réponse sans exposer le mot de passe
        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                university: user.university,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { register };
