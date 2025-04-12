import { useRouter } from "next/router";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { Account } from "../components/account";
import { WalletOptions } from "../components/wallet-options";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function login() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      router.push("/aadhaar");
    }
  }, [anonAadhaar.status, router]);

  if (anonAadhaar.status === "logged-in") {
    return <div>Redirecting to login...</div>;
  }
  return (
    <section className="h-[100vh] w-[100vw] bg-black flex flex-col items-center justify-start">
      <h1 className="text-[10vh] text-white text-center mt-4 flex items-center justify-center">
        Login to BHENDI
      </h1>

      <div className="walletConnection flex flex-col w-[100vw]  justify-center items-center py-8">
        <p className="text-[4vh] text-white">Connect to your wallet!</p>
        <WalletConnect router = { router }/>
      </div>
      <p className="mt-4 text-white">
        You're successfully logged in with AnonAadhaar!
      </p>
    </section>
  );
}

function WalletConnect(props) {
  const { isConnected } = useAccount();
  if (isConnected) {
    props.router.push("/Dashboard")
    return <Account />;
  }
  return (
    <>
      <WalletOptions />
    </>
  );
}
