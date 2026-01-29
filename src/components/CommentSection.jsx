// ============================================
// COMMENTSECTION.JSX - Section des commentaires
// Affiche les commentaires d'un post avec pagination
// Permet d'ajouter un commentaire (si connecte)
// ============================================

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

// Props:
// - comments: tableau des commentaires a afficher
// - onAddComment: fonction pour ajouter un commentaire
// - maxComments: nombre max de commentaires par page (defaut 5)
// - showPagination: afficher les boutons de pagination ou pas
// - showAll: si true, affiche tous les commentaires sans pagination
function CommentSection({ comments, onAddComment, maxComments = 5, showPagination = false, showAll = false }) {
  const { isAuthenticated } = useAuth() // Pour savoir si on peut commenter
  const [newComment, setNewComment] = useState('') // Le texte du nouveau commentaire
  const [currentPage, setCurrentPage] = useState(1) // La page actuelle (pagination)

  // Calculs pour la pagination
  const commentsPerPage = maxComments
  // Math.ceil arrondit au superieur (ex: 7/5 = 1.4 -> 2 pages)
  const totalPages = Math.ceil(comments.length / commentsPerPage)

  // Les commentaires a afficher selon si on montre tout ou pas
  // slice(debut, fin) extrait une portion du tableau
  const displayedComments = showAll
    ? comments // Tous les commentaires
    : comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage)

  // Fonction appelee quand on soumet le formulaire de commentaire
  const handleSubmit = (e) => {
    e.preventDefault() // Empeche le rechargement de la page
    // On verifie que le commentaire est pas vide et que l'user est connecte
    if (newComment.trim() && isAuthenticated) {
      onAddComment(newComment.trim()) // On envoie le commentaire
      setNewComment('') // On vide le champ
    }
  }

  // Fonction pour formater la date
  // Ex: "15 janv. 14:30"
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div>
      {/* Titre avec le nombre de commentaires */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Commentaires ({comments.length})
      </h3>

      {/* Formulaire pour ajouter un commentaire (seulement si connecte) */}
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            {/* Champ de saisie du commentaire */}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} // Met a jour le state a chaque frappe
              placeholder="Ajouter un commentaire..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {/* Bouton envoyer (desactive si champ vide) */}
            <button
              type="submit"
              disabled={!newComment.trim()} // Desactive si commentaire vide
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      )}

      {/* Message si pas connecte */}
      {!isAuthenticated && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
          Connectez-vous pour laisser un commentaire.
        </p>
      )}

      {/* Liste des commentaires */}
      <div className="space-y-3">
        {/* Si pas de commentaires, on affiche un message */}
        {displayedComments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Aucun commentaire pour le moment.
          </p>
        ) : (
          // Sinon on boucle sur les commentaires
          displayedComments.map(comment => (
            <div
              key={comment.id}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              {/* Header du commentaire: nom + date */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  {comment.userName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {/* Le contenu du commentaire */}
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination (seulement si activee et plus d'une page) */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {/* Bouton precedent */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} // Max pour pas aller en dessous de 1
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Précédent
          </button>
          {/* Indicateur de page */}
          <span className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400">
            {currentPage} / {totalPages}
          </span>
          {/* Bouton suivant */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} // Min pour pas depasser totalPages
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export default CommentSection
