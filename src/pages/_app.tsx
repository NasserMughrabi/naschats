import type { AppProps } from "next/app";
import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <CSSReset />
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  );
}
export default MyApp;
