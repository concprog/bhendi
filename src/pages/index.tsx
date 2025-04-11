import { useRouter } from "next/router";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { Account } from "../components/account";
import { WalletOptions } from "../components/wallet-options";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Home() {
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
    <section className="h-[100vh] w-[100vw] bg-gray-100">
      <h1 className="text-[10vh] text-center">Welcome to the Bhendi!</h1>
      <div className="walletConnection flex flex-col w-[100vw] bg-slate-300 justify-center items-center">
        <p className="text-[4vh]">Connect to wallet!</p>
        <WalletConnect />
      </div>
      <p>You're successfully logged in with AnonAadhaar!</p>
    </section>
  );
}

function WalletConnect() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
