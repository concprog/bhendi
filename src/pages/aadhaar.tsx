import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => void;
  useTestAadhaar: boolean;
};

export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  const switchAadhaar = () => {
    setUseTestAadhaar(!useTestAadhaar);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Card Container */}
      <main className="flex flex-col items-center gap-6 bg-white rounded-xl shadow-md max-w-screen-sm mx-auto p-8 transition-all hover:shadow-lg">
        <h1 className="font-bold text-2xl text-gray-800">Welcome to Anon Aadhaar Example</h1>
        <p className="text-gray-600 text-center">
          Prove your Identity anonymously using your Aadhaar card.
        </p>

        {/* Login Button (Customize if needed) */}
        <LogInWithAnonAadhaar 
          nullifierSeed={1234} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
        />

        {/* Aadhaar Mode Toggle */}
        <div className="flex items-center gap-2">
          <p className="text-gray-700">
            You’re using the <strong>{useTestAadhaar ? "test" : "real"}</strong> Aadhaar mode.
          </p>
          <button
            onClick={switchAadhaar}
            className="bg-white hover:bg-gray-50 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium ring-1 ring-gray-300 shadow-sm transition-all"
          >
            Switch to {useTestAadhaar ? "real" : "test"}
          </button>
        </div>
      </main>

      {/* Proof Status Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md max-w-screen-sm mx-auto p-6">
        {anonAadhaar.status === "logged-in" && (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-green-50 text-green-800 px-4 py-2 rounded-md">
              ✅ Proof is valid
            </div>
            <p className="text-gray-700">Got your Aadhaar Identity Proof</p>
            <p className="font-medium text-indigo-600">Welcome anon!</p>
            {latestProof && (
              <AnonAadhaarProof 
                code={JSON.stringify(latestProof, null, 2)} 
                className="w-full p-4 bg-gray-50 rounded-md font-mono text-sm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}