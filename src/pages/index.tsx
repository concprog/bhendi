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
    <section className="h-[100vh] w-[100vw] bg-black flex flex-col items-center justify-start">
      <h1 className="text-[10vh] text-center mt-4 flex items-center justify-center">
        <span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            className="inline-block align-middle"
          >
            <style>
              {`
            @keyframes star-animation {
              0% {
                transform: scale(0.4) rotate(0deg);
                fill: white;
              }
              50% {
                transform: scale(0.6) rotate(180deg);
                fill: white;
              }
              100% {
                transform: scale(0.4) rotate(360deg);
                fill: white;
              }
            }

            .star {
              transform-origin: center;
              animation: star-animation 2s infinite ease-in-out;
            }
          `}
            </style>
            <polygon
              className="star"
              points="50 10 65 35 90 35 70 55 75 80 50 70 25 80 30 55 10 35 35 35"
            />
          </svg>
        </span>
        <span className="mx-4 text-white">Welcome to the Bhendi!</span>
        <span>
          <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            className="inline-block align-middle"
          >
            <style>
              {`
            @keyframes star-animation {
              0% {
                transform: scale(0.4) rotate(0deg);
                fill: white;
                }
                50% {
                  transform: scale(0.6) rotate(180deg);
                  fill: white;
                  }
                  100% {
                    transform: scale(0.4) rotate(360deg);
                    fill: white;
                    }
                    }

                    .star {
                      transform-origin: center;
                      animation: star-animation 2s infinite ease-in-out;
                      }
                      `}
            </style>
            <polygon
              className="star"
              points="50 10 65 35 90 35 70 55 75 80 50 70 25 80 30 55 10 35 35 35"
            />
          </svg>
        </span>
      </h1>

      <div className="walletConnection flex flex-col w-[100vw]  justify-center items-center py-8">
        <p className="text-[4vh] text-white">Connect to wallet!</p>
        <WalletConnect />
      </div>
      <p className="mt-4 text-white">
        You're successfully logged in with AnonAadhaar!
      </p>
    </section>
  );
}

function WalletConnect() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return (
    <>
      <WalletOptions />
    </>
  );
}
