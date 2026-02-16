// les tags pour les articles
<<<<<<< HEAD
// export const TAGS = [
//   { id: 1, name: 'React', color: 'bg-blue-500' },
//   { id: 2, name: 'JavaScript', color: 'bg-yellow-500' },
//   { id: 3, name: 'CSS', color: 'bg-pink-500' },
//   { id: 4, name: 'Node.js', color: 'bg-green-500' },
//   { id: 5, name: 'TypeScript', color: 'bg-blue-700' },
//   { id: 6, name: 'Tutoriel', color: 'bg-purple-500' },
// ]
=======
export const TAGS = [
  { id: 1, name: 'React', color: 'bg-blue-500' },
  { id: 2, name: 'JavaScript', color: 'bg-yellow-500' },
  { id: 3, name: 'CSS', color: 'bg-pink-500' },
  { id: 4, name: 'Node.js', color: 'bg-green-500' },
  { id: 5, name: 'TypeScript', color: 'bg-blue-700' },
  { id: 6, name: 'Tutoriel', color: 'bg-purple-500' },
]
>>>>>>> main
// les users en dur pour tester (normalement ca vient du backend)
export const MOCK_USERS = [
  { id: 1, email: 'admin@blog.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { id: 2, email: 'user@blog.com', password: 'user123', name: 'Jean Dupont', role: 'user' },
  { id: 3, email: 'marie@blog.com', password: 'marie123', name: 'Marie Martin', role: 'user' },
]

// les emojis pour les reactions
export const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🎉']

// les articles du blog (fake data)
// normalement ca viendrait d'une api mais on a pas de backend
<<<<<<< HEAD
// export const INITIAL_POSTS = [
//   {
//     id: 1,
//     title: 'Introduction à React 19',
//     content: `React 19 apporte de nombreuses améliorations passionnantes pour les développeurs. Cette nouvelle version introduit des fonctionnalités révolutionnaires qui simplifient le développement d'applications web modernes.

// Parmi les nouveautés majeures, on trouve les Actions qui permettent de gérer les mutations de données de manière plus intuitive. Les formulaires deviennent plus simples à gérer avec les nouvelles API.

// Le nouveau compilateur React optimise automatiquement votre code, éliminant le besoin de useMemo et useCallback dans la plupart des cas. Cela rend le code plus propre et plus facile à maintenir.

// Les Server Components permettent maintenant de charger des données directement côté serveur, améliorant significativement les performances et l'expérience utilisateur.

// Cette version marque une étape importante dans l'évolution de React, rendant le framework encore plus puissant et accessible aux développeurs de tous niveaux.`,
//     author: 'Admin',
//     authorId: 1,
//     createdAt: '2026-01-15T10:30:00Z',
//     tags: [1, 2],
//     reactions: {
//       '👍': [2, 3],
//       '❤️': [2],
//       '🎉': [3],
//     },
//   },
//   {
//     id: 2,
//     title: 'Les meilleures pratiques CSS en 2026',
//     content: `Le CSS a considérablement évolué ces dernières années. Voici un guide complet des meilleures pratiques à adopter en 2026 pour créer des interfaces modernes et maintenables.

// Container Queries révolutionne le responsive design en permettant aux composants de s'adapter à leur conteneur plutôt qu'à la fenêtre du navigateur. Cette fonctionnalité change fondamentalement notre approche du design adaptatif.

// CSS Nesting est maintenant supporté nativement, permettant d'écrire du CSS de manière plus organisée sans avoir besoin de préprocesseurs comme Sass.

// Les nouvelles fonctions mathématiques comme round(), mod() et rem() offrent plus de contrôle sur les calculs CSS.

// L'utilisation des variables CSS (custom properties) avec les nouveaux espaces de couleurs comme oklch permet une gestion des couleurs plus précise et accessible.

// Cascade Layers (@layer) aide à organiser la spécificité CSS de manière prévisible, réduisant les conflits de styles.`,
//     author: 'Admin',
//     authorId: 1,
//     createdAt: '2026-01-20T14:00:00Z',
//     tags: [3, 6],
//     reactions: {
//       '👍': [2],
//       '😮': [3],
//     },
//   },
//   {
//     id: 3,
//     title: 'Créer une API REST avec Node.js',
//     content: `Dans ce tutoriel, nous allons créer une API REST complète avec Node.js et Express. Ce guide couvre toutes les étapes essentielles pour développer une API robuste et sécurisée.

// Nous commencerons par la configuration du projet avec les meilleures pratiques de structure de dossiers. L'organisation du code est cruciale pour la maintenabilité à long terme.

// La gestion des routes et des contrôleurs sera expliquée en détail, avec des exemples concrets d'implémentation CRUD (Create, Read, Update, Delete).

// L'authentification JWT sera intégrée pour sécuriser les endpoints sensibles. Nous verrons comment implémenter un système de tokens refresh pour une meilleure sécurité.

// La validation des données entrantes avec des bibliothèques comme Zod ou Joi garantira l'intégrité de vos données.

// Enfin, nous ajouterons une gestion d'erreurs centralisée et du logging pour faciliter le debugging en production.`,
//     author: 'Admin',
//     authorId: 1,
//     createdAt: '2026-01-25T09:15:00Z',
//     tags: [4, 2, 6],
//     reactions: {
//       '👍': [2, 3],
//       '❤️': [2, 3],
//       '🎉': [2],
//     },
//   },
//   {
//     id: 4,
//     title: 'TypeScript avancé : Types utilitaires',
//     content: `TypeScript offre des types utilitaires puissants qui peuvent transformer votre façon d'écrire du code typé. Explorons ensemble ces outils essentiels pour tout développeur TypeScript.

// Partial<T> et Required<T> permettent de rendre toutes les propriétés d'un type optionnelles ou obligatoires. Ces types sont particulièrement utiles pour les fonctions de mise à jour.

// Pick<T, K> et Omit<T, K> extraient ou excluent des propriétés spécifiques d'un type, permettant de créer des types dérivés précis.

// Record<K, T> crée un type objet avec des clés de type K et des valeurs de type T, idéal pour les dictionnaires et mappings.

// Les types conditionnels avec infer permettent d'extraire des types de manière dynamique, ouvrant la porte à des patterns très avancés.

// Mapped Types transforment les propriétés d'un type existant, permettant de créer des variations comme des types readonly ou nullable automatiquement.`,
//     author: 'Admin',
//     authorId: 1,
//     createdAt: '2026-01-28T16:45:00Z',
//     tags: [5, 6],
//     reactions: {
//       '😮': [2],
//       '👍': [3],
//     },
//   },
// ]

// // les commentaires
// export const INITIAL_COMMENTS = [
//   // commentaires du post 1 (React 19)
//   { id: 1, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'Super article ! React 19 a l\'air vraiment prometteur.', createdAt: '2026-01-15T12:00:00Z' },
//   { id: 2, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Merci pour ces explications claires sur les nouvelles fonctionnalités.', createdAt: '2026-01-15T14:30:00Z' },
//   { id: 3, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'J\'ai hâte de tester le nouveau compilateur !', createdAt: '2026-01-16T09:00:00Z' },
//   { id: 4, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Les Server Components vont vraiment changer la donne.', createdAt: '2026-01-16T11:15:00Z' },
//   { id: 5, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'Est-ce que la migration depuis React 18 est compliquée ?', createdAt: '2026-01-17T08:00:00Z' },
//   { id: 6, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Je vais commencer à l\'utiliser sur mon prochain projet.', createdAt: '2026-01-17T15:45:00Z' },
//   // commentaires du post 2 (CSS)
//   { id: 7, postId: 2, userId: 2, userName: 'Jean Dupont', content: 'Container Queries, c\'est la révolution !', createdAt: '2026-01-20T16:00:00Z' },
//   { id: 8, postId: 2, userId: 3, userName: 'Marie Martin', content: 'Enfin le nesting natif, plus besoin de Sass juste pour ça.', createdAt: '2026-01-21T10:00:00Z' },
//   // commentaires du post 3 (Node.js)
//   { id: 9, postId: 3, userId: 3, userName: 'Marie Martin', content: 'Tutoriel très complet, merci !', createdAt: '2026-01-25T11:00:00Z' },
//   { id: 10, postId: 3, userId: 2, userName: 'Jean Dupont', content: 'La partie sur JWT est exactement ce que je cherchais.', createdAt: '2026-01-26T14:00:00Z' },
//   // commentaires du post 4 (TypeScript)
//   { id: 11, postId: 4, userId: 2, userName: 'Jean Dupont', content: 'Les mapped types sont vraiment puissants.', createdAt: '2026-01-29T09:00:00Z' },
// ]

// infos de l'auteur pour la page a propos
// export const AUTHOR_INFO = {
//   name: 'Alexandre Durand',
//   title: 'Développeur Full-Stack & Formateur',
//   bio: `Passionné de développement web depuis plus de 10 ans, je partage mes connaissances et découvertes à travers ce blog.

// Spécialisé dans l'écosystème JavaScript/TypeScript, je travaille quotidiennement avec React, Node.js et les technologies cloud modernes.

// Mon objectif est de rendre le développement web accessible à tous, en expliquant les concepts complexes de manière simple et pratique.

// Quand je ne code pas, vous me trouverez probablement en train de lire des articles tech, de contribuer à des projets open source, ou de préparer mes prochains cours.`,
//   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre',
//   social: {
//     github: 'https://github.com',
//     linkedin: 'https://linkedin.com',
//     twitter: 'https://twitter.com',
//   },
//   stats: {
//     posts: 4,
//     comments: 50,
//     followers: 1234,
//   },
// }
=======
export const INITIAL_POSTS = [
  {
    id: 1,
    title: 'Introduction à React 19',
    content: `React 19 apporte de nombreuses améliorations passionnantes pour les développeurs. Cette nouvelle version introduit des fonctionnalités révolutionnaires qui simplifient le développement d'applications web modernes.

Parmi les nouveautés majeures, on trouve les Actions qui permettent de gérer les mutations de données de manière plus intuitive. Les formulaires deviennent plus simples à gérer avec les nouvelles API.

Le nouveau compilateur React optimise automatiquement votre code, éliminant le besoin de useMemo et useCallback dans la plupart des cas. Cela rend le code plus propre et plus facile à maintenir.

Les Server Components permettent maintenant de charger des données directement côté serveur, améliorant significativement les performances et l'expérience utilisateur.

Cette version marque une étape importante dans l'évolution de React, rendant le framework encore plus puissant et accessible aux développeurs de tous niveaux.`,
    author: 'Admin',
    authorId: 1,
    createdAt: '2026-01-15T10:30:00Z',
    tags: [1, 2],
    reactions: {
      '👍': [2, 3],
      '❤️': [2],
      '🎉': [3],
    },
  },
  {
    id: 2,
    title: 'Les meilleures pratiques CSS en 2026',
    content: `Le CSS a considérablement évolué ces dernières années. Voici un guide complet des meilleures pratiques à adopter en 2026 pour créer des interfaces modernes et maintenables.

Container Queries révolutionne le responsive design en permettant aux composants de s'adapter à leur conteneur plutôt qu'à la fenêtre du navigateur. Cette fonctionnalité change fondamentalement notre approche du design adaptatif.

CSS Nesting est maintenant supporté nativement, permettant d'écrire du CSS de manière plus organisée sans avoir besoin de préprocesseurs comme Sass.

Les nouvelles fonctions mathématiques comme round(), mod() et rem() offrent plus de contrôle sur les calculs CSS.

L'utilisation des variables CSS (custom properties) avec les nouveaux espaces de couleurs comme oklch permet une gestion des couleurs plus précise et accessible.

Cascade Layers (@layer) aide à organiser la spécificité CSS de manière prévisible, réduisant les conflits de styles.`,
    author: 'Admin',
    authorId: 1,
    createdAt: '2026-01-20T14:00:00Z',
    tags: [3, 6],
    reactions: {
      '👍': [2],
      '😮': [3],
    },
  },
  {
    id: 3,
    title: 'Créer une API REST avec Node.js',
    content: `Dans ce tutoriel, nous allons créer une API REST complète avec Node.js et Express. Ce guide couvre toutes les étapes essentielles pour développer une API robuste et sécurisée.

Nous commencerons par la configuration du projet avec les meilleures pratiques de structure de dossiers. L'organisation du code est cruciale pour la maintenabilité à long terme.

La gestion des routes et des contrôleurs sera expliquée en détail, avec des exemples concrets d'implémentation CRUD (Create, Read, Update, Delete).

L'authentification JWT sera intégrée pour sécuriser les endpoints sensibles. Nous verrons comment implémenter un système de tokens refresh pour une meilleure sécurité.

La validation des données entrantes avec des bibliothèques comme Zod ou Joi garantira l'intégrité de vos données.

Enfin, nous ajouterons une gestion d'erreurs centralisée et du logging pour faciliter le debugging en production.`,
    author: 'Admin',
    authorId: 1,
    createdAt: '2026-01-25T09:15:00Z',
    tags: [4, 2, 6],
    reactions: {
      '👍': [2, 3],
      '❤️': [2, 3],
      '🎉': [2],
    },
  },
  {
    id: 4,
    title: 'TypeScript avancé : Types utilitaires',
    content: `TypeScript offre des types utilitaires puissants qui peuvent transformer votre façon d'écrire du code typé. Explorons ensemble ces outils essentiels pour tout développeur TypeScript.

Partial<T> et Required<T> permettent de rendre toutes les propriétés d'un type optionnelles ou obligatoires. Ces types sont particulièrement utiles pour les fonctions de mise à jour.

Pick<T, K> et Omit<T, K> extraient ou excluent des propriétés spécifiques d'un type, permettant de créer des types dérivés précis.

Record<K, T> crée un type objet avec des clés de type K et des valeurs de type T, idéal pour les dictionnaires et mappings.

Les types conditionnels avec infer permettent d'extraire des types de manière dynamique, ouvrant la porte à des patterns très avancés.

Mapped Types transforment les propriétés d'un type existant, permettant de créer des variations comme des types readonly ou nullable automatiquement.`,
    author: 'Admin',
    authorId: 1,
    createdAt: '2026-01-28T16:45:00Z',
    tags: [5, 6],
    reactions: {
      '😮': [2],
      '👍': [3],
    },
  },
]

// les commentaires
export const INITIAL_COMMENTS = [
  // commentaires du post 1 (React 19)
  { id: 1, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'Super article ! React 19 a l\'air vraiment prometteur.', createdAt: '2026-01-15T12:00:00Z' },
  { id: 2, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Merci pour ces explications claires sur les nouvelles fonctionnalités.', createdAt: '2026-01-15T14:30:00Z' },
  { id: 3, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'J\'ai hâte de tester le nouveau compilateur !', createdAt: '2026-01-16T09:00:00Z' },
  { id: 4, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Les Server Components vont vraiment changer la donne.', createdAt: '2026-01-16T11:15:00Z' },
  { id: 5, postId: 1, userId: 2, userName: 'Jean Dupont', content: 'Est-ce que la migration depuis React 18 est compliquée ?', createdAt: '2026-01-17T08:00:00Z' },
  { id: 6, postId: 1, userId: 3, userName: 'Marie Martin', content: 'Je vais commencer à l\'utiliser sur mon prochain projet.', createdAt: '2026-01-17T15:45:00Z' },
  // commentaires du post 2 (CSS)
  { id: 7, postId: 2, userId: 2, userName: 'Jean Dupont', content: 'Container Queries, c\'est la révolution !', createdAt: '2026-01-20T16:00:00Z' },
  { id: 8, postId: 2, userId: 3, userName: 'Marie Martin', content: 'Enfin le nesting natif, plus besoin de Sass juste pour ça.', createdAt: '2026-01-21T10:00:00Z' },
  // commentaires du post 3 (Node.js)
  { id: 9, postId: 3, userId: 3, userName: 'Marie Martin', content: 'Tutoriel très complet, merci !', createdAt: '2026-01-25T11:00:00Z' },
  { id: 10, postId: 3, userId: 2, userName: 'Jean Dupont', content: 'La partie sur JWT est exactement ce que je cherchais.', createdAt: '2026-01-26T14:00:00Z' },
  // commentaires du post 4 (TypeScript)
  { id: 11, postId: 4, userId: 2, userName: 'Jean Dupont', content: 'Les mapped types sont vraiment puissants.', createdAt: '2026-01-29T09:00:00Z' },
]

// infos de l'auteur pour la page a propos
export const AUTHOR_INFO = {
  name: 'Alexandre Durand',
  title: 'Développeur Full-Stack & Formateur',
  bio: `Passionné de développement web depuis plus de 10 ans, je partage mes connaissances et découvertes à travers ce blog.

Spécialisé dans l'écosystème JavaScript/TypeScript, je travaille quotidiennement avec React, Node.js et les technologies cloud modernes.

Mon objectif est de rendre le développement web accessible à tous, en expliquant les concepts complexes de manière simple et pratique.

Quand je ne code pas, vous me trouverez probablement en train de lire des articles tech, de contribuer à des projets open source, ou de préparer mes prochains cours.`,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  stats: {
    posts: 4,
    comments: 50,
    followers: 1234,
  },
}
>>>>>>> main
