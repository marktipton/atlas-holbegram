import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext({register, logout});

type AuthContextType = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

export const useAuth = () => useContext<AuthContextType>(AuthContext)

function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

function logout() {
  return auth.signOut();
}

export function AuthProvider({children}: {children: ReactNode}){
  return <AuthContext.Provider value={{register, logout}}>
    {children}
  </AuthContext.Provider>
}