// ============================================
// APP.JSX - Le composant principal de l'application
// C'est lui qui gere les routes et les donnees principales
// En gros c'est le chef d'orchestre du projet
// ============================================

import { Routes, Route } from 'react-router-dom' // Pour definir les routes
import { useState } from 'react' // useState c'est pour creer des variables qui peuvent changer
import Navbar from './components/Navbar' // La barre de navigation en haut
import Home from './pages/Home' // La page d'accueil avec tous les posts
import Login from './pages/Login' // La page de connexion
import About from './pages/About' // La page "a propos" de l'auteur
import CreatePost from './pages/CreatePost' // La page pour creer un article (admin only)
import PostDetail from './pages/PostDetail' // La page pour voir un article en entier
import ProtectedRoute from './components/ProtectedRoute' // Composant qui protege les routes admin
import { INITIAL_POSTS, INITIAL_COMMENTS } from './data/mockData' // Les donnees de test (fake data)

function App() {
  // useState pour stocker les posts, au debut on met les posts de test
  // posts = la liste des articles, setPosts = la fonction pour modifier cette liste
  const [posts, setPosts] = useState(INITIAL_POSTS)

  // Pareil pour les commentaires
  const [comments, setComments] = useState(INITIAL_COMMENTS)

  // Fonction pour ajouter un nouveau post
  // On utilise Date.now() pour generer un ID unique (c'est le timestamp en millisecondes)
  // Le spread operator (...) copie toutes les proprietes du nouveau post
  // On met le nouveau post au debut du tableau avec [newPost, ...prev]
  const addPost = (newPost) => {
    setPosts(prev => [{ ...newPost, id: Date.now() }, ...prev])
  }

  // Fonction pour ajouter un commentaire a un post
  // postId = l'id du post sur lequel on commente
  // comment = le contenu du commentaire
  const addComment = (postId, comment) => {
    setComments(prev => [...prev, { ...comment, id: Date.now(), postId }])
  }

  // Fonction pour gerer les reactions emoji (like, coeur, etc)
  // C'est un peu complique mais en gros:
  // - Si l'emoji existe pas encore, on le cree avec l'userId
  // - Si l'utilisateur a deja clique, on le retire (toggle)
  // - Sinon on ajoute l'utilisateur a la liste
  const toggleReaction = (postId, emoji, userId) => {
    setPosts(prev => prev.map(post => {
      // Si c'est pas le bon post, on le retourne tel quel
      if (post.id !== postId) return post

      // On copie les reactions pour pas modifier l'original (immutabilite)
      const reactions = { ...post.reactions }

      if (!reactions[emoji]) {
        // L'emoji existe pas encore, on le cree
        reactions[emoji] = [userId]
      } else if (reactions[emoji].includes(userId)) {
        // L'utilisateur a deja react, on le retire
        reactions[emoji] = reactions[emoji].filter(id => id !== userId)
        // Si plus personne a react avec cet emoji, on le supprime
        if (reactions[emoji].length === 0) delete reactions[emoji]
      } else {
        // L'utilisateur a pas encore react, on l'ajoute
        reactions[emoji] = [...reactions[emoji], userId]
      }

      // On retourne le post avec les nouvelles reactions
      return { ...post, reactions }
    }))
  }

  return (
    // Le conteneur principal avec une hauteur minimum de 100% de l'ecran
    // bg-gray-50 = fond gris clair, dark:bg-gray-900 = fond gris fonce en mode sombre
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* La navbar est affichee sur toutes les pages */}
      <Navbar />

      {/* Le contenu principal avec du padding et centre */}
      <main className="container mx-auto px-4 py-8">
        {/* Routes = le systeme de navigation, chaque Route = une page */}
        <Routes>
          {/* Route pour la page d'accueil (/) */}
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                comments={comments}
                onToggleReaction={toggleReaction}
                onAddComment={addComment}
              />
            }
          />

          {/* Route pour la page de connexion */}
          <Route path="/login" element={<Login />} />

          {/* Route pour la page a propos */}
          <Route path="/about" element={<About />} />

          {/* Route pour voir un post en detail, :id c'est un parametre dynamique */}
          <Route
            path="/post/:id"
            element={
              <PostDetail
                posts={posts}
                comments={comments}
                onToggleReaction={toggleReaction}
                onAddComment={addComment}
              />
            }
          />

          {/* Route protegee pour creer un post (admin seulement) */}
          {/* ProtectedRoute verifie si l'utilisateur est admin */}
          <Route
            path="/create"
            element={
              <ProtectedRoute requireAdmin>
                <CreatePost onAddPost={addPost} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

// On exporte le composant pour pouvoir l'utiliser dans main.jsx
export default App
