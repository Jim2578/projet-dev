import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  // soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault()
    setError('') // reset l'erreur

    const result = login(email, password)

    if (result.success) {
      console.log("login ok, redirection vers accueil")
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  // const [showPassword, setShowPassword] = useState(false) // TODO: bouton pour afficher le mdp

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Connexion
        </h1>

        {/* message d'erreur */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="email@exemple.com"
              required
            />
          </div>

          {/* mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          {/* bouton connexion */}
          <button
            type="submit"
            className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Se connecter
          </button>
        </form>

        {/* comptes de test pour la demo */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
            Comptes de test :
          </p>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <strong>Admin:</strong> admin@blog.com / admin123
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <strong>User:</strong> user@blog.com / user123
            </div>
          </div>
        </div>

        {/* TODO: ajouter un lien "mot de passe oublié" */}
        {/* TODO: ajouter un lien "creer un compte" */}
      </div>
    </div>
  )
}

export default Login
