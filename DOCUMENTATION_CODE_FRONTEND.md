# Documentation Code Frontend - BlogAura

## Projet DEV Learn IT B3 - Analyse du Code Source React

**Date :** Février 2026
**Type :** Documentation technique du code source frontend
**Framework :** React 19 + Vite 7 + Tailwind CSS 4

---

## Table des matières

1. [Vue d'ensemble du code](#1-vue-densemble-du-code)
2. [Point d'entrée : index.html & main.jsx](#2-point-dentrée--indexhtml--mainjsx)
3. [Composant racine : App.jsx](#3-composant-racine--appjsx)
4. [Contextes React (State global)](#4-contextes-react-state-global)
5. [Composants réutilisables](#5-composants-réutilisables)
6. [Pages de l'application](#6-pages-de-lapplication)
7. [Données simulées : mockData.js](#7-données-simulées--mockdatajs)
8. [Configuration du projet](#8-configuration-du-projet)
9. [Styles et thème CSS](#9-styles-et-thème-css)
10. [Diagrammes de flux de données](#10-diagrammes-de-flux-de-données)
11. [Hooks React utilisés](#11-hooks-react-utilisés)
12. [Patterns et bonnes pratiques](#12-patterns-et-bonnes-pratiques)
13. [Analyse par fichier : lignes de code et rôle](#13-analyse-par-fichier--lignes-de-code-et-rôle)

---

## 1. Vue d'ensemble du code

### 1.1 Arborescence complète du code source

```
src/
├── main.jsx .................. Point d'entrée React (33 lignes)
├── App.jsx ................... Composant racine + routing + state (132 lignes)
├── index.css ................. Styles globaux + Tailwind (27 lignes)
│
├── contexts/ ................. Gestion d'état global
│   ├── AuthContext.jsx ....... Authentification utilisateur (99 lignes)
│   └── ThemeContext.jsx ...... Mode sombre/clair (68 lignes)
│
├── components/ ............... Composants réutilisables
│   ├── Navbar.jsx ............ Barre de navigation (124 lignes)
│   ├── PostCard.jsx .......... Carte d'article (161 lignes)
│   ├── Modal.jsx ............. Fenêtre modale (87 lignes)
│   ├── EmojiReactions.jsx .... Réactions emoji (76 lignes)
│   ├── CommentSection.jsx .... Section commentaires (152 lignes)
│   └── ProtectedRoute.jsx .... Protection des routes (33 lignes)
│
├── pages/ .................... Pages de l'application
│   ├── Home.jsx .............. Page d'accueil (96 lignes)
│   ├── Login.jsx ............. Page de connexion (119 lignes)
│   ├── CreatePost.jsx ........ Création d'article (145 lignes)
│   ├── PostDetail.jsx ........ Détail d'un article (131 lignes)
│   └── About.jsx ............. Page à propos (131 lignes)
│
└── data/
    └── mockData.js ........... Données simulées (183 lignes)
```

### 1.2 Répartition du code

| Catégorie | Fichiers | Lignes totales |
|-----------|----------|----------------|
| Point d'entrée | `main.jsx`, `App.jsx` | ~165 |
| Contextes | `AuthContext.jsx`, `ThemeContext.jsx` | ~167 |
| Composants | 6 composants | ~633 |
| Pages | 5 pages | ~622 |
| Données | `mockData.js` | ~183 |
| Styles | `index.css` | ~27 |
| **Total** | **16 fichiers** | **~1 797 lignes** |

---

## 2. Point d'entrée : index.html & main.jsx

### 2.1 index.html

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BlogAura - Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Rôle :** Point d'entrée HTML de l'application. Vite injecte automatiquement les assets CSS et JS lors du build. La `<div id="root">` est le conteneur où React va monter toute l'application.

### 2.2 main.jsx - Initialisation de l'application

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

**Architecture en "poupées russes" (nesting des Providers) :**

```
StrictMode          → Détection de problèmes en développement
└── BrowserRouter   → Active le système de routes (React Router)
    └── ThemeProvider   → Fournit le thème (dark/light) à toute l'app
        └── AuthProvider    → Fournit l'état d'authentification à toute l'app
            └── App         → Le composant principal
```

**Pourquoi cet ordre ?**
- `BrowserRouter` doit englober tout composant utilisant `Link`, `Route` ou `useNavigate`
- `ThemeProvider` est au-dessus de `AuthProvider` car le thème n'a pas besoin de l'auth
- `AuthProvider` est au-dessus de `App` car les pages ont besoin des infos utilisateur

---

## 3. Composant racine : App.jsx

### 3.1 Rôle

`App.jsx` est le **chef d'orchestre** du projet. Il gère :
- L'état global des posts et commentaires (`useState`)
- Les fonctions de modification de ces données
- La définition de toutes les routes
- La transmission des données aux pages via les **props**

### 3.2 État géré

```jsx
const [posts, setPosts] = useState(INITIAL_POSTS)       // Liste des articles
const [comments, setComments] = useState(INITIAL_COMMENTS) // Liste des commentaires
```

### 3.3 Fonctions métier

#### `addPost(newPost)` — Ajouter un article

```jsx
const addPost = (newPost) => {
  setPosts(prev => [{ ...newPost, id: Date.now() }, ...prev])
}
```

| Concept | Explication |
|---------|-------------|
| `prev =>` | Fonction de mise à jour qui reçoit l'état précédent |
| `...newPost` | Spread operator : copie toutes les propriétés du nouveau post |
| `id: Date.now()` | Génère un ID unique basé sur le timestamp |
| `[newPost, ...prev]` | Place le nouveau post au **début** du tableau (le plus récent en premier) |

#### `addComment(postId, comment)` — Ajouter un commentaire

```jsx
const addComment = (postId, comment) => {
  setComments(prev => [...prev, { ...comment, id: Date.now(), postId }])
}
```

Le commentaire est ajouté à la **fin** du tableau (`[...prev, newComment]`).

#### `toggleReaction(postId, emoji, userId)` — Gérer les réactions emoji

```jsx
const toggleReaction = (postId, emoji, userId) => {
  setPosts(prev => prev.map(post => {
    if (post.id !== postId) return post           // Pas le bon post → on ne touche pas

    const reactions = { ...post.reactions }        // Copie (immutabilité)

    if (!reactions[emoji]) {
      reactions[emoji] = [userId]                  // CAS 1: L'emoji n'existe pas → créer
    } else if (reactions[emoji].includes(userId)) {
      reactions[emoji] = reactions[emoji].filter(id => id !== userId) // CAS 2: Déjà réagi → retirer
      if (reactions[emoji].length === 0) delete reactions[emoji]     // Si vide → supprimer l'emoji
    } else {
      reactions[emoji] = [...reactions[emoji], userId]               // CAS 3: Pas encore réagi → ajouter
    }

    return { ...post, reactions }                  // Retourne le post modifié
  }))
}
```

**Diagramme de décision du toggle :**

```
L'utilisateur clique sur un emoji
        │
        ▼
L'emoji existe dans reactions ?
    │           │
   NON         OUI
    │           │
    ▼           ▼
Créer avec   L'userId est dans la liste ?
[userId]        │           │
               OUI         NON
                │           │
                ▼           ▼
           Retirer      Ajouter
           l'userId     l'userId
                │
                ▼
           Liste vide ?
            │       │
           OUI     NON
            │       │
            ▼       ▼
        Supprimer  Garder
        l'emoji
```

### 3.4 Configuration des routes

```jsx
<Routes>
  <Route path="/"         element={<Home ... />} />
  <Route path="/login"    element={<Login />} />
  <Route path="/about"    element={<About />} />
  <Route path="/post/:id" element={<PostDetail ... />} />
  <Route path="/create"   element={
    <ProtectedRoute requireAdmin>
      <CreatePost onAddPost={addPost} />
    </ProtectedRoute>
  } />
</Routes>
```

| Route | Page | Props transmises | Accès |
|-------|------|-----------------|-------|
| `/` | Home | posts, comments, onToggleReaction, onAddComment | Public |
| `/login` | Login | *(aucune, utilise useAuth)* | Public |
| `/about` | About | *(aucune, utilise mockData)* | Public |
| `/post/:id` | PostDetail | posts, comments, onToggleReaction, onAddComment | Public |
| `/create` | CreatePost | onAddPost | Admin uniquement |

---

## 4. Contextes React (State global)

### 4.1 AuthContext.jsx — Authentification

#### Principe du Context API

Le Context API de React permet de partager des données à travers l'arbre de composants **sans passer par les props** (prop drilling).

```
                    ┌─────────────────┐
                    │   AuthProvider   │
                    │ (stocke le user) │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐
        │  Navbar   │ │  PostCard │ │  Login    │
        │ useAuth() │ │ useAuth() │ │ useAuth() │
        └───────────┘ └───────────┘ └───────────┘
```

#### Utilisateurs mockés

```javascript
const MOCK_USERS = [
  { id: 1, email: 'admin@blog.com', password: 'admin123', name: 'Admin',        role: 'admin' },
  { id: 2, email: 'user@blog.com',  password: 'user123',  name: 'Jean Dupont',  role: 'user'  },
  { id: 3, email: 'marie@blog.com', password: 'marie123', name: 'Marie Martin', role: 'user'  },
]
```

#### Cycle de vie de l'authentification

```
1. CHARGEMENT DE L'APP
   │
   ├── useEffect vérifie localStorage('blogaura_user')
   │   ├── Trouvé    → setUser(JSON.parse(saved))  → Utilisateur restauré
   │   └── Pas trouvé → user reste null             → Non connecté
   │
2. CONNEXION (login)
   │
   ├── Cherche dans MOCK_USERS (email + password)
   │   ├── Trouvé    → Crée objet SANS mot de passe
   │   │               → setUser(userSansMdp)
   │   │               → localStorage.setItem(...)
   │   │               → return { success: true }
   │   └── Pas trouvé → return { success: false, error: '...' }
   │
3. DÉCONNEXION (logout)
   │
   ├── setUser(null)
   └── localStorage.removeItem('blogaura_user')
```

#### Valeurs exposées par le contexte

```javascript
<AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
```

| Valeur | Type | Description |
|--------|------|-------------|
| `user` | `Object \| null` | Objet utilisateur (id, email, name, role) ou null |
| `login(email, pwd)` | `Function` | Retourne `{ success: true }` ou `{ success: false, error }` |
| `logout()` | `Function` | Déconnecte et vide le localStorage |
| `isAdmin` | `Boolean` | `true` si `user.role === 'admin'` |
| `isAuthenticated` | `Boolean` | `true` si `user !== null` |

#### Hook personnalisé `useAuth()`

```jsx
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

**Utilisation dans les composants :**
```jsx
const { user, isAdmin, isAuthenticated, login, logout } = useAuth()
```

---

### 4.2 ThemeContext.jsx — Mode sombre/clair

#### Mécanisme du dark mode

```
1. INITIALISATION
   │
   ├── Vérifie localStorage('blogaura_theme')
   │   ├── 'dark'  → setIsDark(true)
   │   ├── 'light' → setIsDark(false)
   │   └── absent  → Détecte préférence système
   │                   window.matchMedia('(prefers-color-scheme: dark)')
   │
2. QUAND isDark CHANGE (useEffect)
   │
   ├── isDark === true  → document.documentElement.classList.add('dark')
   │                       → localStorage.setItem('blogaura_theme', 'dark')
   │
   └── isDark === false → document.documentElement.classList.remove('dark')
                           → localStorage.setItem('blogaura_theme', 'light')
```

**Comment Tailwind CSS détecte le dark mode :**

```css
/* Dans index.css */
@custom-variant dark (&:where(.dark, .dark *));
```

Cette directive dit à Tailwind : "applique les classes `dark:` quand l'élément ou un de ses parents a la classe `.dark`".

**Exemple concret :**
```html
<!-- Quand <html> a la classe "dark" -->
<html class="dark">
  <body class="bg-gray-50 dark:bg-gray-900">
    <!-- bg-gray-50 est ignoré, dark:bg-gray-900 est appliqué -->
```

#### Valeurs exposées

```javascript
<ThemeContext.Provider value={{ isDark, toggleTheme }}>
```

| Valeur | Type | Description |
|--------|------|-------------|
| `isDark` | `Boolean` | `true` si mode sombre actif |
| `toggleTheme()` | `Function` | Bascule entre sombre et clair |

---

## 5. Composants réutilisables

### 5.1 Navbar.jsx — Barre de navigation

**Fichier :** `src/components/Navbar.jsx` (124 lignes)

**Dépendances :** `react-router-dom` (Link, useNavigate), `useAuth`, `useTheme`

**Rendu conditionnel selon l'état de connexion :**

```
┌────────────────────────────────────────────────────────────────┐
│ BlogAura          Accueil  A propos  [Nouveau Post]  🌙  User │
│                                         ▲            ▲    ▲   │
│                                         │            │    │   │
│                              Admin only  │   Toggle   │  Nom + │
│                              (isAdmin)   │   Theme    │  Badge │
│                                          │            │  Admin │
│                                          │            │        │
│                    Si connecté: ──────────────── Nom + Déconnexion
│                    Si pas connecté: ────────────── Bouton Connexion
└────────────────────────────────────────────────────────────────┘
```

**Classes CSS clés :**
- `sticky top-0 z-50` : Reste collé en haut lors du scroll
- `shadow-md` : Ombre portée sous la navbar
- `transition-colors` : Animation fluide lors du changement de thème

---

### 5.2 PostCard.jsx — Carte d'article

**Fichier :** `src/components/PostCard.jsx` (161 lignes)

**Props :**

```typescript
{
  post: {
    id: number,
    title: string,
    content: string,
    author: string,
    createdAt: string,    // ISO 8601
    tags: number[],       // IDs des tags
    reactions: {          // { emoji: [userId, ...] }
      [emoji: string]: number[]
    }
  },
  comments: Comment[],         // TOUS les commentaires (filtrés à l'intérieur)
  onToggleReaction: Function,  // (postId, emoji, userId) => void
  onAddComment: Function       // (postId, commentObject) => void
}
```

**State interne :**

```jsx
const [showModal, setShowModal] = useState(false) // Contrôle l'ouverture de la modale
```

**Logique de filtrage des données :**

```jsx
// Filtre les commentaires pour ce post uniquement
const postComments = comments.filter(c => c.postId === post.id)

// Récupère les objets tags complets à partir des IDs
const postTags = TAGS.filter(tag => post.tags.includes(tag.id))
```

**Troncature du contenu à 5 lignes :**

```html
<div className="line-clamp-5">
  {post.content}
</div>
```

La classe `line-clamp-5` est définie dans `index.css` :
```css
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

**Deux modes d'affichage des commentaires :**

```
┌─ PostCard (page d'accueil) ──────────────────┐
│  CommentSection                               │
│    maxComments={5}  → 5 commentaires max      │
│    showPagination   → Boutons Préc./Suivant   │
└───────────────────────────────────────────────┘

┌─ Modal (article complet) ────────────────────┐
│  CommentSection                               │
│    showAll          → Tous les commentaires   │
│    (pas de pagination)                        │
└───────────────────────────────────────────────┘
```

---

### 5.3 Modal.jsx — Fenêtre modale

**Fichier :** `src/components/Modal.jsx` (87 lignes)

**Props :**

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `Boolean` | Si `true`, affiche la modale |
| `onClose` | `Function` | Appelée pour fermer |
| `title` | `String` | Titre en haut de la modale |
| `children` | `ReactNode` | Contenu libre |

**Gestion des effets de bord (useEffect) :**

```jsx
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') onClose()        // Ferme avec Échap
  }

  if (isOpen) {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'  // Bloque le scroll du body
  }

  return () => {                              // Cleanup (nettoyage)
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'unset'   // Réactive le scroll
  }
}, [isOpen, onClose])
```

**Structure visuelle :**

```
┌─────────────────────────────────────────┐
│          OVERLAY (bg-black/50)          │  ← Clic = fermer
│  ┌──────────────────────────────────┐   │
│  │  Titre                     [X]  │   │  ← Bouton fermer
│  ├──────────────────────────────────┤   │
│  │                                  │   │
│  │  {children}                      │   │  ← Contenu scrollable
│  │  (max-h-[70vh] overflow-y-auto)  │   │     (70% de la hauteur écran)
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

### 5.4 EmojiReactions.jsx — Réactions emoji

**Fichier :** `src/components/EmojiReactions.jsx` (76 lignes)

**Emojis disponibles :** `['👍', '❤️', '😂', '😮', '😢', '🎉']`

**Props :**

| Prop | Type | Description |
|------|------|-------------|
| `reactions` | `Object` | `{ '👍': [2, 3], '❤️': [2] }` |
| `onToggle` | `Function` | Appelée avec l'emoji cliqué |
| `userId` | `Number \| null` | ID de l'utilisateur courant |

**Logique par emoji :**

```jsx
EMOJIS.map(emoji => {
  // Compter les réactions
  let count = 0
  if (reactions[emoji]) {
    count = reactions[emoji].length     // Nombre de users qui ont réagi
  }

  // Vérifier si l'utilisateur a déjà réagi
  let hasReacted = false
  if (reactions[emoji] && userId) {
    hasReacted = reactions[emoji].includes(userId)
  }

  // Rendu du bouton avec style conditionnel
})
```

**États visuels des boutons :**

| État | Style | Curseur |
|------|-------|---------|
| Non connecté | `opacity-70` | `cursor-not-allowed` |
| Connecté, pas réagi | `bg-gray-100` | `cursor-pointer` + `hover:scale-110` |
| Connecté, a réagi | `bg-primary-100 border-2 border-primary-500` | `cursor-pointer` + `hover:scale-110` |

---

### 5.5 CommentSection.jsx — Section commentaires

**Fichier :** `src/components/CommentSection.jsx` (152 lignes)

**Props :**

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `comments` | `Array` | - | Commentaires du post |
| `onAddComment` | `Function` | - | Callback d'ajout |
| `maxComments` | `Number` | `5` | Commentaires par page |
| `showPagination` | `Boolean` | `false` | Afficher pagination |
| `showAll` | `Boolean` | `false` | Afficher tous sans pagination |

**Calcul de la pagination :**

```jsx
const commentsPerPage = maxComments                                    // 5
const totalPages = Math.ceil(comments.length / commentsPerPage)        // ex: 6/5 = 2

const displayedComments = showAll
  ? comments                                                           // Tous
  : comments.slice(
      (currentPage - 1) * commentsPerPage,                            // Début: (1-1)*5 = 0
      currentPage * commentsPerPage                                    // Fin:   1*5 = 5
    )
```

**Exemple pour 11 commentaires avec maxComments=5 :**

| Page | slice(début, fin) | Commentaires affichés |
|------|-------------------|----------------------|
| 1 | slice(0, 5) | #1, #2, #3, #4, #5 |
| 2 | slice(5, 10) | #6, #7, #8, #9, #10 |
| 3 | slice(10, 15) | #11 |

**Navigation sécurisée :**

```jsx
// Bouton Précédent : ne descend jamais en dessous de 1
onClick={() => setCurrentPage(p => Math.max(1, p - 1))}

// Bouton Suivant : ne dépasse jamais totalPages
onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
```

**Format de date :**

```jsx
new Date(dateString).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})
// Résultat : "15 janv. 14:30"
```

---

### 5.6 ProtectedRoute.jsx — Protection des routes

**Fichier :** `src/components/ProtectedRoute.jsx` (33 lignes)

**Le composant le plus court mais le plus critique pour la sécurité.**

```jsx
function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated)          return <Navigate to="/login" replace />
  if (requireAdmin && !isAdmin)  return <Navigate to="/" replace />

  return children
}
```

**Diagramme de décision :**

```
Accès à une route protégée
        │
        ▼
Est connecté ?
   │        │
  NON      OUI
   │        │
   ▼        ▼
Redir    requireAdmin ?
/login      │        │
           NON      OUI
            │        │
            ▼        ▼
         Accès    Est admin ?
         OK        │        │
                  NON      OUI
                   │        │
                   ▼        ▼
                Redir    Accès
                /        OK
```

**Utilisation dans App.jsx :**

```jsx
<Route path="/create" element={
  <ProtectedRoute requireAdmin>
    <CreatePost onAddPost={addPost} />
  </ProtectedRoute>
} />
```

---

## 6. Pages de l'application

### 6.1 Home.jsx — Page d'accueil

**Fichier :** `src/pages/Home.jsx` (96 lignes)

**State :**

```jsx
const [selectedTag, setSelectedTag] = useState(null) // null = "Tous"
```

**Filtrage des articles par tag :**

```jsx
const filteredPosts = selectedTag
  ? posts.filter(post => post.tags.includes(selectedTag))
  : posts  // selectedTag === null → tous les posts
```

**Layout responsive (grille) :**

```jsx
<div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
```

| Écran | Colonnes | Breakpoint |
|-------|----------|------------|
| Mobile (< 768px) | 1 colonne | Par défaut |
| Tablette (768px - 1023px) | 1 colonne | `md:` |
| Desktop (>= 1024px) | 2 colonnes | `lg:` |

---

### 6.2 Login.jsx — Page de connexion

**Fichier :** `src/pages/Login.jsx` (119 lignes)

**State :**

```jsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
```

**Flux de connexion :**

```
Utilisateur remplit le formulaire
        │
        ▼
    handleSubmit()
        │
        ├── e.preventDefault()     // Empêche rechargement
        ├── setError('')           // Reset erreur
        │
        ▼
    login(email, password)         // Appel AuthContext
        │
    ┌───┴───────┐
    │           │
  success    failure
    │           │
    ▼           ▼
navigate('/')  setError(result.error)
```

**Comptes de test affichés :** Le formulaire affiche les identifiants de test en bas de page pour faciliter la démonstration.

---

### 6.3 CreatePost.jsx — Création d'article (Admin)

**Fichier :** `src/pages/CreatePost.jsx` (145 lignes)

**State :**

```jsx
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [selectedTags, setSelectedTags] = useState([])
```

**Toggle de sélection de tags :**

```jsx
const handleTagToggle = (tagId) => {
  setSelectedTags(prev =>
    prev.includes(tagId)
      ? prev.filter(id => id !== tagId)  // Retirer le tag
      : [...prev, tagId]                  // Ajouter le tag
  )
}
```

**Objet post créé lors de la soumission :**

```javascript
{
  title: "Mon article",
  content: "Le contenu...",
  author: user.name,                    // Nom de l'admin connecté
  authorId: user.id,
  createdAt: new Date().toISOString(),  // Ex: "2026-02-15T10:30:00.000Z"
  tags: [1, 3],                         // IDs des tags sélectionnés
  reactions: {}                         // Vide au départ
}
```

---

### 6.4 PostDetail.jsx — Détail d'un article

**Fichier :** `src/pages/PostDetail.jsx` (131 lignes)

**Récupération du post par ID d'URL :**

```jsx
const { id } = useParams()                          // Ex: id = "3"
const post = posts.find(p => p.id === parseInt(id))  // Cherche le post avec id === 3
```

**Gestion du 404 :**

```jsx
if (!post) {
  return (
    <div>
      <h1>Article non trouvé</h1>
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    </div>
  )
}
```

**Différences avec PostCard :**

| Aspect | PostCard (accueil) | PostDetail (page dédiée) |
|--------|-------------------|--------------------------|
| Contenu | Tronqué (5 lignes) | Complet |
| Titre | `text-xl` | `text-3xl` |
| Commentaires | 5 max + pagination | Tous (showAll) |
| Espacement | `p-6` | `p-8` |
| Texte | Taille normale | `text-lg leading-relaxed` |

---

### 6.5 About.jsx — Page à propos

**Fichier :** `src/pages/About.jsx` (131 lignes)

**Données affichées (depuis `AUTHOR_INFO`) :**

```javascript
{
  name: 'Alexandre Durand',
  title: 'Développeur Full-Stack & Formateur',
  bio: '...',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre',
  social: { github, linkedin, twitter },
  stats: { posts: 4, comments: 50, followers: 1234 }
}
```

**Effet visuel de la bannière :**

```jsx
{/* Bannière avec dégradé */}
<div className="bg-gradient-to-r from-primary-500 to-primary-700 h-32" />

{/* Avatar qui chevauche la bannière avec marge négative */}
<div className="-mt-16">
  <img className="w-32 h-32 rounded-full border-4 border-white" />
</div>
```

**Sécurité des liens externes :**

```jsx
<a href="..." target="_blank" rel="noopener noreferrer">
```

`rel="noopener noreferrer"` empêche la page ouverte d'accéder à `window.opener` (faille de sécurité potentielle).

---

## 7. Données simulées : mockData.js

**Fichier :** `src/data/mockData.js` (183 lignes)

### 7.1 Exports

| Export | Type | Description |
|--------|------|-------------|
| `TAGS` | `Array<{ id, name, color }>` | 6 tags avec couleurs Tailwind |
| `EMOJIS` | `Array<string>` | 6 emojis Unicode |
| `INITIAL_POSTS` | `Array<Post>` | 4 articles de blog |
| `INITIAL_COMMENTS` | `Array<Comment>` | 11 commentaires |
| `AUTHOR_INFO` | `Object` | Informations de l'auteur |

### 7.2 Structure d'un Post

```javascript
{
  id: 1,                                    // Identifiant unique (number)
  title: 'Introduction à React 19',        // Titre de l'article
  content: '...',                           // Contenu complet avec \n
  author: 'Admin',                          // Nom de l'auteur
  authorId: 1,                              // ID de l'auteur
  createdAt: '2026-01-15T10:30:00Z',      // Date ISO 8601
  tags: [1, 2],                            // IDs des tags (React, JavaScript)
  reactions: {                              // Réactions par emoji
    '👍': [2, 3],                          // Users 2 et 3 ont liké
    '❤️': [2],                            // User 2 a mis un cœur
  }
}
```

### 7.3 Structure d'un Comment

```javascript
{
  id: 1,                                    // Identifiant unique
  postId: 1,                               // Référence vers le post
  userId: 2,                               // Qui a commenté
  userName: 'Jean Dupont',                 // Nom affiché (dénormalisé)
  content: 'Super article !',             // Texte du commentaire
  createdAt: '2026-01-15T12:00:00Z'       // Date de création
}
```

### 7.4 Répartition des commentaires par post

| Post | Nombre de commentaires |
|------|----------------------|
| #1 — Introduction à React 19 | 6 commentaires |
| #2 — Meilleures pratiques CSS | 2 commentaires |
| #3 — API REST avec Node.js | 2 commentaires |
| #4 — TypeScript avancé | 1 commentaire |

---

## 8. Configuration du projet

### 8.1 package.json

```json
{
  "name": "blogaura",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

| Script | Commande | Fonction |
|--------|----------|----------|
| `npm run dev` | `vite` | Serveur de développement (HMR) sur `localhost:5173` |
| `npm run build` | `vite build` | Build de production dans `dist/` |
| `npm run preview` | `vite preview` | Prévisualise le build de production |

### 8.2 Dépendances

**Production (3 packages) :**

| Package | Version | Rôle |
|---------|---------|------|
| `react` | ^19.2.4 | Bibliothèque UI (composants, hooks, Virtual DOM) |
| `react-dom` | ^19.2.4 | Rendu React dans le navigateur (DOM) |
| `react-router-dom` | ^7.13.0 | Routing côté client (SPA) |

**Développement (7 packages) :**

| Package | Version | Rôle |
|---------|---------|------|
| `vite` | ^7.3.1 | Bundler et serveur de dev |
| `@vitejs/plugin-react` | ^5.1.3 | Support JSX et Fast Refresh |
| `tailwindcss` | ^4.1.18 | Framework CSS utilitaire |
| `@tailwindcss/vite` | ^4.1.18 | Plugin Tailwind pour Vite |
| `@tailwindcss/postcss` | ^4.1.18 | Plugin Tailwind pour PostCSS |
| `postcss` | ^8.5.6 | Transformations CSS |
| `autoprefixer` | ^10.4.24 | Ajout automatique des préfixes vendeurs |

### 8.3 vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 8.4 tailwind.config.js

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd',
          300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9',
          600: '#0284c7', 700: '#0369a1', 800: '#075985',
          900: '#0c4a6e'
        }
      }
    }
  }
}
```

**Palette de couleurs "primary" (nuances de bleu) :**

```
50  ████  #f0f9ff  (très clair)
100 ████  #e0f2fe
200 ████  #bae6fd
300 ████  #7dd3fc
400 ████  #38bdf8
500 ████  #0ea5e9  ← Couleur principale
600 ████  #0284c7  ← Boutons, liens
700 ████  #0369a1
800 ████  #075985
900 ████  #0c4a6e  (très foncé)
```

### 8.5 postcss.config.js

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  }
}
```

---

## 9. Styles et thème CSS

### 9.1 index.css — Styles globaux

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
}

body {
  @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100
         transition-colors duration-200;
}

.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 9.2 Classes Tailwind les plus utilisées

| Classe | Usage | Composants |
|--------|-------|------------|
| `bg-white dark:bg-gray-800` | Fond des cartes | PostCard, Modal, Login, CreatePost |
| `text-gray-900 dark:text-white` | Texte principal | Titres, noms |
| `text-gray-500 dark:text-gray-400` | Texte secondaire | Dates, métadonnées |
| `rounded-xl shadow-md` | Style carte | PostCard, Modal, About |
| `px-4 py-2 rounded-lg` | Style bouton | Tous les boutons |
| `bg-primary-600 text-white` | Bouton principal | Connexion, Publier |
| `hover:bg-primary-700` | Hover bouton | Boutons principaux |
| `transition-colors` | Animation douce | Presque tous les éléments |
| `flex items-center gap-4` | Layout horizontal | Navbar, boutons |
| `container mx-auto` | Centrage du contenu | App, Navbar |

---

## 10. Diagrammes de flux de données

### 10.1 Flux global de l'application

```
┌─────────────────────────────────────────────────────────────────┐
│                          App.jsx                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  STATE:                                                   │   │
│  │  • posts (useState)      ← INITIAL_POSTS                │   │
│  │  • comments (useState)   ← INITIAL_COMMENTS             │   │
│  │                                                           │   │
│  │  FONCTIONS:                                               │   │
│  │  • addPost()             → setPosts(...)                 │   │
│  │  • addComment()          → setComments(...)              │   │
│  │  • toggleReaction()      → setPosts(...)                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                    │
│                    Props ↓ transmises                             │
│                              │                                    │
│  ┌─────────┐  ┌──────────┐  ┌──────────────┐  ┌────────────┐   │
│  │  Home   │  │  Login   │  │  PostDetail  │  │ CreatePost │   │
│  │         │  │          │  │              │  │            │   │
│  │ posts   │  │ useAuth  │  │ posts        │  │ onAddPost  │   │
│  │ comments│  │          │  │ comments     │  │            │   │
│  │ callbacks│ │          │  │ callbacks    │  │            │   │
│  └────┬────┘  └──────────┘  └──────┬───────┘  └────────────┘   │
│       │                            │                              │
│       ▼                            ▼                              │
│  ┌─────────┐               ┌──────────────┐                     │
│  │PostCard │               │EmojiReactions│                     │
│  │         │               │CommentSection│                     │
│  │ post    │               └──────────────┘                     │
│  │ comments│                                                     │
│  │ callbacks                                                     │
│  └────┬────┘                                                     │
│       │                                                           │
│       ▼                                                           │
│  ┌──────────────┐  ┌───────┐                                    │
│  │EmojiReactions│  │ Modal │                                    │
│  │CommentSection│  │       │                                    │
│  └──────────────┘  └───────┘                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Flux d'une réaction emoji

```
1. User clique sur 👍
       │
       ▼
2. EmojiReactions.onToggle('👍')
       │
       ▼
3. PostCard: onToggleReaction(post.id, '👍', userId)
       │
       ▼
4. App.toggleReaction(postId, '👍', userId)
       │
       ▼
5. setPosts() → nouveau tableau avec reactions modifiées
       │
       ▼
6. React re-rend les composants avec le nouveau state
       │
       ▼
7. EmojiReactions reçoit les nouvelles reactions via props
       │
       ▼
8. Le compteur et le style du bouton sont mis à jour
```

### 10.3 Flux d'ajout d'un commentaire

```
1. User tape du texte et clique "Envoyer"
       │
       ▼
2. CommentSection.handleSubmit()
       │
       ├── e.preventDefault()
       ├── Vérifie que le texte n'est pas vide
       │
       ▼
3. onAddComment("Mon commentaire")
       │
       ▼
4. PostCard construit l'objet commentaire:
   {
     userId: user.id,
     userName: user.name,
     content: "Mon commentaire",
     createdAt: new Date().toISOString()
   }
       │
       ▼
5. App.addComment(postId, commentObject)
       │
       ▼
6. setComments(prev => [...prev, { ...comment, id: Date.now(), postId }])
       │
       ▼
7. React re-rend → CommentSection affiche le nouveau commentaire
```

---

## 11. Hooks React utilisés

### 11.1 Tableau récapitulatif

| Hook | Fichiers | Usage |
|------|----------|-------|
| `useState` | App, PostCard, CommentSection, Login, CreatePost, Home, AuthContext, ThemeContext | Gérer l'état local |
| `useEffect` | Modal, AuthContext, ThemeContext | Effets de bord (DOM, localStorage) |
| `useContext` | AuthContext (`useAuth`), ThemeContext (`useTheme`) | Accéder au state global |
| `useNavigate` | Navbar, Login, CreatePost, PostDetail | Navigation programmatique |
| `useParams` | PostDetail | Lire les paramètres d'URL |

### 11.2 Détail d'utilisation

#### `useState` — Gestion de l'état local

```jsx
// Syntaxe : const [valeur, setValeur] = useState(valeurInitiale)

// App.jsx — Données principales
const [posts, setPosts] = useState(INITIAL_POSTS)
const [comments, setComments] = useState(INITIAL_COMMENTS)

// PostCard.jsx — UI
const [showModal, setShowModal] = useState(false)

// CommentSection.jsx — Formulaire + pagination
const [newComment, setNewComment] = useState('')
const [currentPage, setCurrentPage] = useState(1)

// Login.jsx — Formulaire
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')

// CreatePost.jsx — Formulaire
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [selectedTags, setSelectedTags] = useState([])

// Home.jsx — Filtre
const [selectedTag, setSelectedTag] = useState(null)
```

#### `useEffect` — Effets de bord

```jsx
// AuthContext.jsx — Charger l'user au démarrage
useEffect(() => {
  const saved = localStorage.getItem('blogaura_user')
  if (saved) setUser(JSON.parse(saved))
}, [])                                        // [] = une seule fois

// ThemeContext.jsx — Appliquer le thème
useEffect(() => {
  const root = document.documentElement
  if (isDark) root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem('blogaura_theme', isDark ? 'dark' : 'light')
}, [isDark])                                  // Se relance quand isDark change

// Modal.jsx — Écouter la touche Échap
useEffect(() => {
  // Setup
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
  // Cleanup
  return () => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'unset'
  }
}, [isOpen, onClose])
```

#### `useNavigate` — Navigation programmatique

```jsx
const navigate = useNavigate()

navigate('/')       // Redirige vers l'accueil (après login, après création de post)
navigate('/login')  // Redirige vers la page de connexion
```

#### `useParams` — Paramètres d'URL

```jsx
// URL: /post/3
const { id } = useParams()  // id = "3" (string)
const post = posts.find(p => p.id === parseInt(id))
```

---

## 12. Patterns et bonnes pratiques

### 12.1 Immutabilité du state

React exige de ne **jamais modifier directement** le state. On crée toujours de **nouvelles copies**.

```jsx
// ❌ MAUVAIS — mutation directe
posts[0].reactions['👍'].push(userId)

// ✅ BON — nouvelle copie
setPosts(prev => prev.map(post => {
  if (post.id !== postId) return post
  const reactions = { ...post.reactions }          // Copie de l'objet
  reactions[emoji] = [...reactions[emoji], userId]  // Copie du tableau
  return { ...post, reactions }                     // Copie du post
}))
```

### 12.2 Rendu conditionnel

Trois techniques utilisées dans le projet :

```jsx
// 1. Opérateur && (si la condition est vraie, afficher)
{isAdmin && <Link to="/create">Nouveau Post</Link>}

// 2. Opérateur ternaire (si/sinon)
{user ? <span>{user.name}</span> : <Link to="/login">Connexion</Link>}

// 3. Return anticipé (early return)
if (!isOpen) return null  // Si fermé, ne rien afficher
```

### 12.3 Composants contrôlés (Controlled Components)

Tous les inputs sont "contrôlés" par React (la valeur est dans le state) :

```jsx
<input
  value={email}                             // La valeur vient du state
  onChange={(e) => setEmail(e.target.value)} // Chaque frappe met à jour le state
/>
```

### 12.4 Callbacks et remontée d'état (Lifting State Up)

Les données sont gérées dans `App.jsx` et les fonctions de modification sont passées en props :

```
App.jsx (détient posts + comments)
    │
    ├── addComment() passé en prop → Home → PostCard → CommentSection
    │
    └── CommentSection appelle onAddComment("texte")
        → PostCard construit l'objet complet
        → App.addComment() met à jour le state
        → React re-rend tout l'arbre
```

### 12.5 Formatage des dates en français

```jsx
// Format long (PostCard, PostDetail)
new Date('2026-01-15T10:30:00Z').toLocaleDateString('fr-FR', {
  day: 'numeric', month: 'long', year: 'numeric'
})
// → "15 janvier 2026"

// Format court (CommentSection)
new Date('2026-01-15T14:30:00Z').toLocaleDateString('fr-FR', {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
})
// → "15 janv. 14:30"
```

---

## 13. Analyse par fichier : lignes de code et rôle

| # | Fichier | Lignes | Rôle principal | Hooks utilisés |
|---|---------|--------|----------------|----------------|
| 1 | `main.jsx` | 33 | Bootstrap de l'app (Providers, Router) | — |
| 2 | `App.jsx` | 132 | State global (posts/comments), routes, fonctions métier | `useState` |
| 3 | `index.css` | 27 | Import Tailwind, thème, line-clamp | — |
| 4 | `AuthContext.jsx` | 99 | Authentification, login/logout, localStorage | `useState`, `useEffect`, `useContext` |
| 5 | `ThemeContext.jsx` | 68 | Dark/Light mode, préférence système | `useState`, `useEffect`, `useContext` |
| 6 | `Navbar.jsx` | 124 | Navigation, toggle thème, affichage user | `useAuth`, `useTheme`, `useNavigate` |
| 7 | `PostCard.jsx` | 161 | Carte article + modale | `useState`, `useAuth` |
| 8 | `Modal.jsx` | 87 | Popup overlay, fermeture Échap, scroll lock | `useEffect` |
| 9 | `EmojiReactions.jsx` | 76 | Boutons emoji avec compteurs | `useAuth` |
| 10 | `CommentSection.jsx` | 152 | Liste commentaires, pagination, formulaire | `useState`, `useAuth` |
| 11 | `ProtectedRoute.jsx` | 33 | Garde de route (auth + rôle) | `useAuth` |
| 12 | `Home.jsx` | 96 | Grille d'articles, filtrage par tags | `useState` |
| 13 | `Login.jsx` | 119 | Formulaire de connexion | `useState`, `useAuth`, `useNavigate` |
| 14 | `CreatePost.jsx` | 145 | Formulaire de création d'article | `useState`, `useAuth`, `useNavigate` |
| 15 | `PostDetail.jsx` | 131 | Article complet + commentaires | `useParams`, `useNavigate`, `useAuth` |
| 16 | `About.jsx` | 131 | Profil auteur, stats, réseaux sociaux | — |
| 17 | `mockData.js` | 183 | Tags, emojis, posts, commentaires, auteur | — |

---

**Document rédigé le :** Février 2026
**Projet :** BlogAura - DEV Learn IT B3
**Objectif :** Documentation détaillée du code source frontend React
