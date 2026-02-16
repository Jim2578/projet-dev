import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import ProtectedRoute from './components/ProtectedRoute'
import { INITIAL_POSTS, INITIAL_COMMENTS } from './data/mockData'

// import Footer from './components/Footer' // TODO: creer un footer plus tard

function App() {
  // les states principaux de l'appli
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [comments, setComments] = useState(INITIAL_COMMENTS)

  // const [loading, setLoading] = useState(false) // pour plus tard quand on aura le backend

  // ajouter un nouveau post
  function addPost(newPost) {
    // on genere un id unique avec Date.now() et on met le post au debut
    const postAvecId = {
      ...newPost,
      id: Date.now()
    }
    setPosts(prev => [postAvecId, ...prev])
    // console.log("post ajouté: ", postAvecId)
  }

  // ajouter un commentaire
  function addComment(postId, comment) {
    const nouveauCommentaire = {
      ...comment,
      id: Date.now(),
      postId: postId
    }
    setComments(prev => [...prev, nouveauCommentaire])
  }

  // gerer les reactions emoji (toggle)
  // si l'user a deja reagit on retire, sinon on ajoute
  function toggleReaction(postId, emoji, userId) {
    setPosts(prev => {
      const nouveauxPosts = prev.map(post => {
        if (post.id !== postId) {
          return post // pas le bon post, on touche pas
        }

        // on copie les reactions pour pas modifier directement le state
        const nouvellesReactions = { ...post.reactions }

        // cas 1: l'emoji existe pas encore
        if (!nouvellesReactions[emoji]) {
          nouvellesReactions[emoji] = [userId]
        }
        // cas 2: l'user a deja reagit, on retire
        else if (nouvellesReactions[emoji].includes(userId)) {
          nouvellesReactions[emoji] = nouvellesReactions[emoji].filter(id => id !== userId)
          // si plus personne on supprime l'emoji
          if (nouvellesReactions[emoji].length === 0) {
            delete nouvellesReactions[emoji]
          }
        }
        // cas 3: l'user a pas encore reagit, on ajoute
        else {
          nouvellesReactions[emoji] = [...nouvellesReactions[emoji], userId]
        }

        return { ...post, reactions: nouvellesReactions }
      })

      return nouveauxPosts
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* page d'accueil */}
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

          <Route path="/login" element={<Login />} />

          {/* <Route path="/about" element={<About />} /> */}

          {/* page detail avec l'id en parametre */}
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

          {/* route protegee, faut etre admin */}
          <Route
            path="/create"
            element={
              <ProtectedRoute requireAdmin>
                <CreatePost onAddPost={addPost} />
              </ProtectedRoute>
            }
          />

          {/* TODO: ajouter une page 404 */}
        </Routes>
      </main>

      {/* TODO: ajouter un footer ici */}
    </div>
  )
}

export default App
