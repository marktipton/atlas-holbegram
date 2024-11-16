import { auth, fbprovider } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({
  register,
  logout,
  login,
  loginWithFacebook,
});

type AuthContextType = {
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithFacebook: () => Promise<UserCredential>;
  user?: User | null;
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

function loginWithFacebook() {
  return signInWithPopup(auth, fbprovider);
}

export function AuthProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // create subscription when component mounts
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, [])
  return <AuthContext.Provider value={{user, register, logout, login, loginWithFacebook}}>
    {children}
  </AuthContext.Provider>
}