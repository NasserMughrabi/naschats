import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import router from "next/router";

const GoogleSignin = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    fetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ user }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          router.push("/chat");
          return response.json();
        }
        setLoading(false);
        throw new Error(message);
      })
      .catch((e) => {
        console.log(e.message);
        alert(e);
      });
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

const redirect = () => {
  getRedirectResult(auth).then(async (userCred) => {
    if (!userCred) {
      return;
    }

    setLoading(true);

    fetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify(userCred.user),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/chat");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

export { GoogleSignin, redirect };
