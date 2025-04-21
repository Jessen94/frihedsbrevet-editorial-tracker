import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginProvider } from "../context/loginContext";
import "../styles/globals.css";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <LoginProvider>
          <Component {...pageProps} />
        </LoginProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
