// ============================================
// NAVBAR.JSX - La barre de navigation
// Elle est presente sur toutes les pages, en haut
// Contient les liens, le bouton theme et la gestion connexion/deconnexion
// ============================================

import { Link, useNavigate } from 'react-router-dom' // Link c'est comme <a> mais pour React Router
import { useAuth } from '../contexts/AuthContext' // Pour savoir si l'user est connecte
import { useTheme } from '../contexts/ThemeContext' // Pour le dark mode

function Navbar() {
  // On recupere les infos dont on a besoin depuis les contextes
  const { user, logout, isAdmin } = useAuth() // user = l'utilisateur connecte, logout = fonction deconnexion
  const { isDark, toggleTheme } = useTheme() // isDark = true si mode sombre, toggleTheme = fonction pour changer
  const navigate = useNavigate() // Hook pour naviguer programmatiquement (rediriger l'user)

  // Fonction appelee quand on clique sur deconnexion
  const handleLogout = () => {
    logout() // On deconnecte l'user
    navigate('/') // On le redirige vers l'accueil
  }

  return (
    // La nav est sticky (reste en haut quand on scroll) avec un z-index eleve
    // pour qu'elle soit toujours au dessus du reste
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Flexbox pour aligner les elements horizontalement */}
        <div className="flex items-center justify-between h-16">
          {/* Le logo/nom du site, c'est un lien vers l'accueil */}
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            BlogAura
          </Link>

          {/* La partie droite avec les liens et boutons */}
          <div className="flex items-center gap-4">
            {/* Lien vers l'accueil */}
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Accueil
            </Link>

            {/* Lien vers la page a propos */}
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              A propos
            </Link>

            {/* Ce lien s'affiche SEULEMENT si l'user est admin */}
            {/* Le && c'est du rendu conditionnel: si isAdmin est true, on affiche le Link */}
            {isAdmin && (
              <Link
                to="/create"
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Nouveau Post
              </Link>
            )}

            {/* Bouton pour changer le theme (soleil/lune) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme" // Pour l'accessibilite
            >
              {/* On affiche le soleil si c'est dark (pour passer en light) */}
              {/* Et la lune si c'est light (pour passer en dark) */}
              {isDark ? (
                // Icone soleil (SVG)
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                // Icone lune (SVG)
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Section connexion/deconnexion */}
            {/* Si user existe (connecte) on affiche son nom et le bouton deconnexion */}
            {/* Sinon on affiche le bouton connexion */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Nom de l'utilisateur */}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user.name}
                  {/* Badge "Admin" si l'user est admin */}
                  {isAdmin && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                      Admin
                    </span>
                  )}
                </span>
                {/* Bouton deconnexion */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              // Bouton connexion si pas connecte
              <Link
                to="/login"
                className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
