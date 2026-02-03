# Guide de Soutenance - BlogAura

## Informations pratiques

- **Date :** 19 Février 2026
- **Durée :** 30 minutes
- **Format :** Présentation en équipe

---

## Plan de présentation suggéré (30 min)

### 1. Introduction (3 min)
- Présentation de l'équipe
- Contexte du projet
- Objectifs

### 2. Démonstration live (10 min)

**Parcours visiteur (non connecté) :**
- Page d'accueil avec liste des articles
- Filtrage par tags
- Clic sur "Lire la suite" → modale
- Toggle dark/light mode
- Page "À propos"

**Parcours utilisateur (connecté) :**
- Connexion avec `user@blog.com / user123`
- Réagir avec un emoji (montrer le toggle)
- Ajouter un commentaire
- Pagination des commentaires
- Déconnexion

**Parcours administrateur :**
- Connexion avec `admin@blog.com / admin123`
- Montrer le lien "Nouveau Post" dans la navbar
- Créer un article avec tags
- Montrer que l'article apparaît en haut de la liste

**Protection des routes :**
- Se déconnecter
- Tenter d'accéder à `/create` → redirection

### 3. Architecture technique (7 min)

**Structure du projet :**
```
src/
├── components/   # Composants réutilisables
├── pages/        # Pages de l'application
├── contexts/     # Contextes React (Auth, Theme)
└── data/         # Données mockées
```

**Technologies :**
- React 19 : Pourquoi React ? (composants, hooks)
- Vite : Pourquoi pas CRA ? (rapidité)
- Tailwind CSS : Avantages (utilitaires, dark mode)
- React Router : Gestion des routes

**Gestion de l'état :**
- Context API pour Auth et Theme
- useState pour l'état local
- Props pour les données partagées

### 4. Fonctionnalités clés (5 min)

**Système d'authentification :**
- Utilisateurs mockés
- Persistance localStorage
- Rôles (admin/user)

**Système de réactions :**
- 6 emojis disponibles
- Compteur par emoji
- Toggle (ajout/retrait)

**Commentaires :**
- Pagination (5 par page)
- Formulaire d'ajout
- Affichage complet en modale

**Bonus :**
- Dark/Light mode (préférence système + toggle)
- Système de tags (filtrage)

### 5. Difficultés et solutions (3 min)

1. **Configuration Tailwind v4**
   - Problème : Erreur PostCSS
   - Solution : Plugin `@tailwindcss/vite`

2. **Dark mode**
   - Problème : Ne fonctionnait pas
   - Solution : `@custom-variant dark`

3. **Logique des réactions**
   - Problème : Toggle complexe
   - Solution : Conditions multiples dans la fonction

### 6. Conclusion (2 min)

**Bilan :**
- Toutes les fonctionnalités implémentées
- 2 bonus (dark mode, tags)
- Code commenté et documenté

**Améliorations possibles :**
- Backend réel
- TypeScript
- Tests automatisés
- PWA

**Questions ?**

---

## Points à préparer

### Questions possibles du jury

1. **Pourquoi React plutôt que Vue ou Angular ?**
   - Popularité, écosystème, hooks

2. **Pourquoi pas de backend ?**
   - Scope du projet front-end only
   - Données mockées suffisantes pour démo

3. **Comment fonctionne le Context API ?**
   - Provider qui wrap l'app
   - useContext pour consommer

4. **Comment fonctionne le dark mode ?**
   - Classe `dark` sur `<html>`
   - Classes Tailwind `dark:*`

5. **Comment sont protégées les routes ?**
   - Composant ProtectedRoute
   - Vérification auth + rôle
   - Redirection si non autorisé

6. **Pourquoi Tailwind plutôt que CSS classique ?**
   - Rapidité de développement
   - Consistance du design
   - Dark mode intégré

### Checklist avant la soutenance

- [ ] Vérifier que `npm run dev` fonctionne
- [ ] Tester tous les comptes (admin, user)
- [ ] Vérifier le dark mode
- [ ] Vérifier la création d'article
- [ ] Vérifier les commentaires et réactions
- [ ] Vérifier la pagination
- [ ] Vérifier la protection des routes
- [ ] Avoir la documentation imprimée

### Répartition du temps de parole

Si équipe de 3 personnes :
- Personne 1 : Introduction + Démo (13 min)
- Personne 2 : Architecture + Fonctionnalités (12 min)
- Personne 3 : Difficultés + Conclusion (5 min)

---

## Commandes utiles pendant la démo

```bash
# Lancer l'application
npm run dev

# Si le port 5173 est occupé, Vite utilisera 5174
# Vérifier l'URL dans le terminal
```

## URLs à montrer

- http://localhost:5173/ (Accueil)
- http://localhost:5173/login (Connexion)
- http://localhost:5173/about (À propos)
- http://localhost:5173/create (Création - admin only)
- http://localhost:5173/post/1 (Détail article)
