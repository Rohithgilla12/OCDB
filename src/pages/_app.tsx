import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>One click Database</title>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
      </Head>
      <Provider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
