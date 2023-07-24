import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { router } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithRedirect(auth, provider);
    } catch (e) {
      return {
        error: e.message,
      };
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
