// ============================================
// CREATEPOST.JSX - Page de creation d'article
// Formulaire pour creer un nouvel article (admin only)
// Cette page est protegee par ProtectedRoute
// ============================================

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TAGS } from '../data/mockData' // Liste des tags disponibles

// Props:
// - onAddPost: fonction pour ajouter le post (vient de App.jsx)
function CreatePost({ onAddPost }) {
  // On recupere l'user pour mettre son nom en auteur
  const { user } = useAuth()
  const navigate = useNavigate()

  // States pour les champs du formulaire
  const [title, setTitle] = useState('') // Le titre de l'article
  const [content, setContent] = useState('') // Le contenu de l'article
  const [selectedTags, setSelectedTags] = useState([]) // Les tags selectionnes (tableau d'IDs)

  // Fonction pour toggle un tag (ajouter/retirer)
  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        // Si le tag est deja selectionne, on le retire
        ? prev.filter(id => id !== tagId)
        // Sinon on l'ajoute
        : [...prev, tagId]
    )
  }

  // Fonction appelee quand on soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault() // Empeche le rechargement de la page

    // On verifie que les champs sont pas vides
    if (title.trim() && content.trim()) {
      // On cree le nouveau post avec toutes les infos
      onAddPost({
        title: title.trim(),
        content: content.trim(),
        author: user.name, // Le nom de l'user connecte
        authorId: user.id,
        createdAt: new Date().toISOString(), // Date actuelle en format ISO
        tags: selectedTags,
        reactions: {}, // Pas de reactions au debut
      })
      // On redirige vers l'accueil
      navigate('/')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Nouveau Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ titre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Titre de votre article"
              required
            />
          </div>

          {/* Selection des tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            {/* On affiche tous les tags comme des boutons cliquables */}
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag.id}
                  type="button" // Important: type="button" pour pas soumettre le form
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      // Si selectionne: couleur du tag
                      ? `${tag.color} text-white`
                      // Sinon: gris
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Zone de texte pour le contenu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenu
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12} // Nombre de lignes visibles
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Écrivez votre article ici..."
              required
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            {/* Bouton publier */}
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()} // Desactive si champs vides
              className="flex-1 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Publier
            </button>
            {/* Bouton annuler */}
            <button
              type="button"
              onClick={() => navigate('/')} // Retour a l'accueil sans sauvegarder
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
