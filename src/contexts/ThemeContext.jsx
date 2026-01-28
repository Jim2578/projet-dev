// ============================================
// THEMECONTEXT.JSX - Gestion du theme Dark/Light
// Permet de switcher entre le mode sombre et le mode clair
// Meme principe que AuthContext mais pour le theme
// ============================================

import { createContext, useContext, useState, useEffect } from 'react'

// Creation du contexte pour le theme
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // State pour savoir si on est en mode sombre ou pas
  // Par defaut on met false (mode clair)
  const [isDark, setIsDark] = useState(false)

  // useEffect pour charger la preference au demarrage
  // Se lance une seule fois grace au tableau vide []
  useEffect(() => {
    // On regarde si ya une preference sauvegardee
    const saved = localStorage.getItem('blogaura_theme')
    if (saved) {
      // Si oui, on l'utilise
      setIsDark(saved === 'dark')
    } else {
      // Sinon on regarde la preference systeme de l'utilisateur
      // window.matchMedia permet de checker les media queries en JS
      const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefereDark)
    }
  }, [])

  // useEffect pour appliquer le theme quand isDark change
  useEffect(() => {
    // document.documentElement c'est la balise <html>
    const root = document.documentElement
    if (isDark) {
      // En mode sombre, on ajoute la classe 'dark' au HTML
      // Tailwind utilise cette classe pour appliquer les styles dark:
      root.classList.add('dark')
    } else {
      // En mode clair, on enleve la classe
      root.classList.remove('dark')
    }
    // On sauvegarde la preference dans le localStorage
    localStorage.setItem('blogaura_theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Fonction pour changer le theme
  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook pour utiliser le theme facilement dans les composants
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
