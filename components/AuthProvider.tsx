import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext({register, logout, login});

type AuthContextType = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
}

export const useAuth = () => useContext<AuthContextType>(AuthContext)

function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

function logout() {
  return auth.signOut();
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function AuthProvider({children}: {children: ReactNode}){
  return <AuthContext.Provider value={{register, logout, login}}>
    {children}
  </AuthContext.Provider>
}