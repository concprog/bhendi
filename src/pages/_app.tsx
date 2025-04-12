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

    // Add Google Translate script
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    // script.setAttribute("style", "background-color:green;");
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "es,fr,de,zh,hi", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };
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
              {/* Google Translate Widget */}
              {/* <div id="google_translate_element" style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }}></div> */}
            </AnonAadhaarProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  );
}
