// ============================================
// LOGIN.JSX - Page de connexion
// Formulaire pour se connecter au blog
// Avec les identifiants de test affiches en bas (pratique pour le prof)
// ============================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Pour rediriger apres connexion
import { useAuth } from '../contexts/AuthContext' // Pour la fonction login

function Login() {
  // States pour les champs du formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // Pour afficher les erreurs

  // On recupere la fonction login depuis le contexte
  const { login } = useAuth()
  // Hook pour naviguer vers une autre page
  const navigate = useNavigate()

  // Fonction appelee quand on soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault() // Empeche le rechargement de la page
    setError('') // On reset l'erreur

    // On essaie de se connecter
    const result = login(email, password)

    if (result.success) {
      // Si ca marche, on redirige vers l'accueil
      navigate('/')
    } else {
      // Sinon on affiche l'erreur
      setError(result.error)
    }
  }

  return (
    // Conteneur centre avec une largeur max
    <div className="max-w-md mx-auto mt-10">
      {/* La carte blanche qui contient le formulaire */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Connexion
        </h1>

        {/* Affichage de l'erreur si ya une erreur */}
        {/* Le && fait un rendu conditionnel: si error existe, on affiche la div */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Le formulaire de connexion */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Met a jour le state
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="email@exemple.com"
              required // Champ obligatoire (validation HTML5)
            />
          </div>

          {/* Champ mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              type="password" // Cache les caracteres
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Se connecter
          </button>
        </form>

        {/* Section avec les comptes de test */}
        {/* Pratique pour tester sans avoir a retenir les mdp */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
            Comptes de test :
          </p>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {/* Compte admin */}
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <strong>Admin:</strong> admin@blog.com / admin123
            </div>
            {/* Compte utilisateur normal */}
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <strong>User:</strong> user@blog.com / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
