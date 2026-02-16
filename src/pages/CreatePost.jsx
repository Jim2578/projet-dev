import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TAGS } from '../data/mockData'

function CreatePost({ onAddPost }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  // ajouter ou retirer un tag
  function handleTagToggle(tagId) {
    if (selectedTags.includes(tagId)) {
      // le tag est deja la, on le retire
      const newTags = selectedTags.filter(id => id !== tagId)
      setSelectedTags(newTags)
    } else {
      // on ajoute le tag
      setSelectedTags([...selectedTags, tagId])
    }
  }

  /* version courte (meme chose):
  function handleTagToggle(tagId) {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }
  */

  // quand on publie l'article
  function handleSubmit(e) {
    e.preventDefault()

    // verif que c'est pas vide
    if (!title.trim() || !content.trim()) {
      // alert("Remplis le titre et le contenu !") // version moche mais ca marchait
      return
    }

    const nouveauPost = {
      title: title.trim(),
      content: content.trim(),
      author: user.name,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      tags: selectedTags,
      reactions: {} // vide au debut
    }

    onAddPost(nouveauPost)
    console.log("article publié:", nouveauPost.title)
    navigate('/') // retour a l'accueil
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Nouveau Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* titre */}
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

          {/* selection des tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      ? `${tag.color} text-white`
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* contenu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenu
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Écrivez votre article ici..."
              required
            />
          </div>

          {/* boutons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              className="flex-1 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Publier
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
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
