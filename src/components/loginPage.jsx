import axios from "axios";
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Récupération du token CSRF
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                await axios.get("http://localhost:8000/sanctum/csrf-cookie", { withCredentials: true });
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
            const response = await axios.post("http://localhost:8000/api/login", {
                email,
                password,
            }, {
                withCredentials: true,
            });

            alert(response.data.message);
            navigate("/accueil"); // Redirection après connexion réussie
        } catch (err) {
            const message = err.response?.data?.message || "Une erreur s'est produite, veuillez réessayer.";
            setError(message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Connexion
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-500 hover:underline"
                    >
                        Pas encore de compte ? Inscrivez-vous ici.
                    </button>
                    <button
                        onClick={() => navigate("/forgetpossword")}
                        className="text-blue-500 hover:underline block mt-2"
                    >
                        Mot de passe oublié ?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
