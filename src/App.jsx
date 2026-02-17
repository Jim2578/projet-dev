import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import ProtectedRoute from './components/ProtectedRoute'
import { getPosts, getCommentsByPost, addComment, addReact, removeReact } from './api/dataBridge'
import { getMe } from './api/authService'

const user = await getMe() // on peut aussi le stocker dans un context pour le rendre accessible partout

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
  async function AddComment(postId, comment) {
    console.log("ajout commentaire:", comment)
    const nouveauCommentaire = {
      ...comment,
      id: Date.now(),
      postId: postId,
      userId: comment.userId,
    }
    await addComment(postId, comment.text)
    setComments(prev => [...prev, nouveauCommentaire])
  }

  // gerer les reactions emoji (toggle)
  // si l'user a deja reagit on retire, sinon on ajoute
async function toggleReaction(postId, emoji) {
  const userId = user?.id_user
  if (!userId) return
  const users = (posts.reactions?.[emoji] ?? [])
  let action = users.includes(userId) ? "remove" : "add"

  setPosts(prev =>
    prev.map(post => {
      if (post.id !== postId) return post

      const reactions = { ...(post.reactions ?? {}) }
      const users = reactions[emoji] ?? []

      if (users.includes(userId)) {
        // REMOVE
        const nextUsers = users.filter(id => id !== userId)
        if (nextUsers.length === 0) delete reactions[emoji]
        else reactions[emoji] = nextUsers
        action = "remove"
      } else {
        // ADD
        reactions[emoji] = [...users, userId]
        action = "add"
      }

      return { ...post, reactions }
    })
  )

  try {
    if (action === "add") await addReact(postId, emoji)
    if (action === "remove") await removeReact(postId, emoji)
  } catch (e) {
    console.error("Erreur toggleReaction:", e)
  }
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
                onAddComment={AddComment}
              />
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* page detail avec l'id en parametre */}
          <Route
            path="/post/:id"
            element={
              <PostDetail
                posts={posts}
                comments={comments}
                onToggleReaction={toggleReaction}
                onAddComment={AddComment}
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
