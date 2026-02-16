import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import ProtectedRoute from './components/ProtectedRoute'
import { INITIAL_POSTS, INITIAL_COMMENTS } from './data/mockData'
import { getPosts, getCommentsByPost } from './api/dataBridge'
// import Footer from './components/Footer' // TODO: creer un footer plus tard

function App() {
  // les states principaux de l'appli
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const apiPosts = await getPosts()
        const normalized = (apiPosts ?? []).map(p => ({
          id: p.id_post,
          title: p.title,
          text: p.text,
          reactions: p.reactions ?? {},
          id_user: p.id_user ?? null,
          createdAt: p.createdAt,
          _loadingDetails: true, // indique que les infos détaillées sont en cours
        }))

        // afficher les posts immédiatement
        setPosts(normalized)
        // puis charger les commentaires pour chaque post
        for (const post of normalized) {
          const apiComments = await getCommentsByPost(post.id)
          const postComments = (apiComments ?? []).map(c => ({
            id: c.id_comment,
            postId: c.id_post,
            text: c.text,
            id_user: c.id_user,
            userName: c.pseudo,
            createdAt: c.createdAt
          }))
          setComments(postComments)
        }
      } catch (e) {
        console.error("Erreur getCommentsByPost:", e)
      }
    }
load()}, [])

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
