import { auth } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence
} from "firebase/auth";

export const AuthService = {
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        user: userCred.user
      };
    } catch (e: any) {
      return {
        error: e.message
      };
    }
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCred = await signInWithPopup(auth, provider);

      return {
        user: userCred.user
      };
    } catch (e: any) {
      return {
        error: e.message
      };
    }
  },

  loginWithEmailAndPassword: async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      return {
        user: userCred.user
      };
    } catch (e: any) {
      return {
        error: e.message
      };
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      console.log("logged out");
    } catch (e: any) {
      console.error(e);
      throw e;
    }
  }
};
