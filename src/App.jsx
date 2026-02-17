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

  // 1) Déterminer l’ancienne réaction du user sur ce post (dans l’état actuel)
  const post = posts.find(p => p.id === postId)
  if (!post) return
  const reactions = post.reactions ?? {}
  let oldEmoji = null
  for (const [e, ids] of Object.entries(reactions)) {
    if ((ids ?? []).includes(userId)) {
      oldEmoji = e
      break
    }
  }

  // action côté API :
  // - si on clique le même emoji -> remove
  // - sinon -> add (ça remplace l’ancienne en DB)
  const action = oldEmoji === emoji ? "remove" : "add"
  console.log(action)
  // 2) UI optimiste : 1 seule réaction par user
  setPosts(prev =>
    prev.map(p => {
      if (p.id !== postId) return p
      const next = { ...(p.reactions ?? {}) }
      // enlever le user de l'ancien emoji (si existant)
      if (oldEmoji && next[oldEmoji]) {
        const filtered = next[oldEmoji].filter(id => id !== userId)
        if (filtered.length === 0) delete next[oldEmoji]
        else next[oldEmoji] = filtered
      }
      if (action === "add") {
        const current = next[emoji] ?? []
        if (!current.includes(userId)) next[emoji] = [...current, userId]
      } else {
        // action === "remove" : on ne remet rien
      }
      return { ...p, reactions: next }
    })
  )
  // 3) Synchro DB
    if (action === "add") {
      // upsert => remplace l’ancienne réaction en DB
      if(oldEmoji) await removeReact(postId, oldEmoji)
      await addReact(postId, emoji)
    } else {
      await removeReact(postId, emoji)
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
