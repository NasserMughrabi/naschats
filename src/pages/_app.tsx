import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AuthContextProvider } from "../context/AuthContext";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";


function MyApp({ Component, pageProps }: AppProps) {
  
  const auth = getAuth();
  getRedirectResult(auth)
    .then((result) => {
      // The signed-in user info.
      if (!result) {
        return;
      }
      const user = result.user;
      console.log("userss ", user);
      fetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((response) => {
          response.json();
        })
        .catch((error) => {
          console.log("here", error.message);
        });
    })
    .catch((error) => {
      console.log(error);
    });


  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <AuthContextProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </AuthContextProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
