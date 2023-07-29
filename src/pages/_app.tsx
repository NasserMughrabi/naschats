import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AuthContextProvider } from "../context/AuthContext";
import '../static/scrollbar.css'; 
import "../static/microphone.css"



function MyApp({ Component, pageProps }: AppProps) {
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
