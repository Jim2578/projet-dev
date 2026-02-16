import { createContext, useContext, useState, useEffect } from 'react'
import { MOCK_USERS } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // au chargement on verifie si ya un user dans le localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blogaura_user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {
        // au cas ou le json est corrompu
        console.log("erreur parsing localStorage", e)
        localStorage.removeItem('blogaura_user')
      }
    }
  }, [])

  // fonction de login
  const login = (email, password) => {
    // on cherche si l'user existe dans notre liste
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      // on enleve le mdp avant de stocker (securite)
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }
      setUser(userData)
      localStorage.setItem('blogaura_user', JSON.stringify(userData))
      console.log("connexion reussie:", userData.name)
      return { success: true }
    }

    console.log("echec connexion pour:", email)
    return { success: false, error: 'Email ou mot de passe incorrect' }
  }

  // deconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem('blogaura_user')
    console.log("deconnexion")
  }

  // verif si admin
  let isAdmin = false
  if (user !== null && user.role === 'admin') {
    isAdmin = true
  }

  // verif si connecte
  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// hook custom pour utiliser l'auth plus facilement
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit etre utilise dans un AuthProvider')
  }
  return context
}
