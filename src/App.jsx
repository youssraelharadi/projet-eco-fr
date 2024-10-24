import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import Accueil from './components/Accueil';
const App = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 text-white">
        <Link to="/" className="mr-4">Accueil</Link>
        <Link to="/login" className="mr-4">Connexion</Link>
        <Link to="/register" className="mr-4">Inscription</Link>
        <a href="#" className="mr-4">Suivez-nous</a>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
       <Route path='accueil' element={<Accueil/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
