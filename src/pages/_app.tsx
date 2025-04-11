import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../components/config";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const QC = new QueryClient();

  return (
    <>
      {ready ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={QC}>
            <AnonAadhaarProvider
              _useTestAadhaar={useTestAadhaar}
              _appName="Anon Aadhaar"
              _artifactslinks={{
                zkey_url: "/circuit_final.zkey",
                wasm_url: "/aadhaar-verifier.wasm",
                vkey_url: "/vkey.json"
              }}
            >
              <Component
                {...pageProps}
                setUseTestAadhaar={setUseTestAadhaar}
                useTestAadhaar={useTestAadhaar}
              />
            </AnonAadhaarProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  );
}
