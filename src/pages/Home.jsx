import { useState } from 'react'
import PostCard from '../components/PostCard'
import { TAGS } from '../data/mockData'

function Home({ posts, comments, onToggleReaction, onAddComment }) {
  // le tag selectionne pour filtrer (null = tous)
  const [selectedTag, setSelectedTag] = useState(null)

  // filtrer les posts par tag
  let filteredPosts = posts
  if (selectedTag !== null) {
    filteredPosts = posts.filter(post => post.tags.includes(selectedTag))
  }

  /* version avec ternaire (marche aussi):
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts
  */

  return (
    <div>
      {/* titre de la page */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Bienvenue sur BlogAura
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Découvrez les derniers articles sur le développement web
        </p>
      </div>

      {/* filtres par tag */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {/* bouton Tous */}
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === null
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Tous
        </button>

        {/* un bouton par tag */}
        {TAGS.map(tag => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag.id
                ? `${tag.color} text-white`
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* grille des articles */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            comments={comments}
            onToggleReaction={onToggleReaction}
            onAddComment={onAddComment}
          />
        ))}
      </div>

      {/* message si aucun article */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun article trouvé pour ce tag.
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
