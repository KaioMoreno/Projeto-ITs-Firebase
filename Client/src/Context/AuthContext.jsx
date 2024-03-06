import { useContext, useState, createContext} from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null)

    const login = (newToken) => {
        setToken(newToken)
    }

    const logout = (newToken) => {
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}