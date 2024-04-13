import Layout from "@/src/components/Layout";
import { persistor, store } from "@/store";
import "@/styles/globals.css";
import "@/styles/sidebar.css";
import "@/styles/textfield.css";
import "@fontsource/lato";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Obtener la instancia de router

  // Verificar si la ruta es /login o /register
  const shouldRenderLayout =
    router.pathname !== "/login" && router.pathname !== "/register";

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Toaster position="top-right" reverseOrder={true} />
          {shouldRenderLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
