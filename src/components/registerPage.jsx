import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const apiUrl = "http://localhost:8000/api"; // Assurez-vous que l'URL est correcte

    // Appeler le token CSRF au chargement de la page
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                // Appel à l'API pour obtenir le token CSRF
                await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                    withCredentials: true,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération du token CSRF", error);
                setError("Erreur lors de la récupération du token CSRF. Veuillez réessayer.");
            }
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Requête POST pour l'inscription
            const response = await axios.post(
                `${apiUrl}/register`,
                {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                },
                {
                    withCredentials: true, // Nécessaire pour inclure les cookies (CSRF)
                }
            );

            alert(response.data.message);
            navigate("/login"); // Rediriger après l'inscription
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur s'est produite, veuillez réessayer.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Inscription</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nom"
                        required
                        className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required
                        className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                        required
                        className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Inscription
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
