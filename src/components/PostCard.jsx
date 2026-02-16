import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TAGS, EMOJIS } from '../data/mockData'
import EmojiReactions from './EmojiReactions'
import CommentSection from './CommentSection'
import Modal from './Modal'

function PostCard({ post, comments, onToggleReaction, onAddComment }) {
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()

  // on recupere l'id du user connecte (ou null)
  const userId = user ? user.id : null

  // on filtre les commentaires de ce post
  const postComments = comments.filter(c => c.postId === post.id)

  // on recupere les tags du post
  const postTags = TAGS.filter(tag => post.tags.includes(tag.id))

  // formater une date en francais
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // ouvrir la modale
  function ouvrirModal() {
    setShowModal(true)
  }

  // fermer la modale
  function fermerModal() {
    setShowModal(false)
  }

  return (
    <>
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* les tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {postTags.map(tag => (
              <span
                key={tag.id}
                className={`px-2 py-1 text-xs text-white rounded-full ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* titre */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h2>

          {/* auteur + date */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Par {post.author} - {formatDate(post.createdAt)}
          </p>

          {/* apercu du contenu (5 lignes max) */}
          <div className="text-gray-700 dark:text-gray-300 line-clamp-5 mb-4">
            {post.content}
          </div>

          {/* bouton pour ouvrir la modale */}
          <button
            onClick={ouvrirModal}
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium mb-4 inline-block"
          >
            Lire la suite +
          </button>

          {/* les emojis */}
          <EmojiReactions
            reactions={post.reactions}
            onToggle={(emoji) => onToggleReaction(post.id, emoji, userId)}
            userId={userId}
          />

          {/* les commentaires */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <CommentSection
              comments={postComments}
              onAddComment={(content) => onAddComment(post.id, {
                userId: user.id,
                userName: user.name,
                content,
                createdAt: new Date().toISOString(),
              })}
              maxComments={5}
              showPagination
            />
          </div>
        </div>
      </article>

      {/* modale pour l'article complet */}
      <Modal isOpen={showModal} onClose={fermerModal} title={post.title}>
        {/* tags dans la modale */}
        <div className="flex flex-wrap gap-2 mb-4">
          {postTags.map(tag => (
            <span
              key={tag.id}
              className={`px-2 py-1 text-xs text-white rounded-full ${tag.color}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Par {post.author} - {formatDate(post.createdAt)}
        </p>
        {/* contenu complet */}
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
          {post.content}
        </div>

        <EmojiReactions
          reactions={post.reactions}
          onToggle={(emoji) => onToggleReaction(post.id, emoji, userId)}
          userId={userId}
        />

        {/* tous les commentaires dans la modale (pas de pagination) */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <CommentSection
            comments={postComments}
            onAddComment={(content) => onAddComment(post.id, {
              userId: user.id,
              userName: user.name,
              content,
              createdAt: new Date().toISOString(),
            })}
            showAll
          />
        </div>
      </Modal>
    </>
  )
}

export default PostCard
