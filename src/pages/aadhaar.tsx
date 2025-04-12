import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, ToggleRight, Key } from "lucide-react";
import { useRouter } from "next/router";

type HomeProps = {
  setUseTestAadhaar: (state: boolean) => void;
  useTestAadhaar: boolean;
};

export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const router = useRouter();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
      router.push("/Dashboard");
    }
  }, [anonAadhaar]);

  const switchAadhaar = () => {
    setUseTestAadhaar(!useTestAadhaar);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {/* Card Container */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-green-400" />
                <h2 className="text-2xl font-bold text-gray-100">Anonymous Identity Verification</h2>
              </div>
              
              <p className="text-gray-300">
                Prove your Identity anonymously using your Aadhaar card.
              </p>
              
              {/* Login Button (Customize if needed) */}
              <div className="py-2">
                <LogInWithAnonAadhaar nullifierSeed={5517521370862712922191135222416411013524}/>
              </div>
              
              {/* Aadhaar Mode Toggle */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-300">
                      You're using the <span className={useTestAadhaar ? "text-yellow-400" : "text-green-400"}>
                        {useTestAadhaar ? "test" : "real"}
                      </span> Aadhaar mode.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={switchAadhaar}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    <ToggleRight className="h-4 w-4" />
                    <span>Switch to {useTestAadhaar ? "real" : "test"}</span>
                  </motion.button>
                </div>
              </div>
              
              {/* Proof Status Section */}
              {anonAadhaar.status === "logged-in" && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-lg p-4 border border-green-500"
                >
                  <div className="flex items-center space-x-2 mb-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-bold">✅ Proof is valid</p>
                  </div>
                  
                  <p className="text-gray-300 mb-2">
                    Got your Aadhaar Identity Proof
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-100">
                    Welcome anon!
                  </h3>
                  
                  {latestProof && (
                    <div className="mt-4 overflow-hidden">
                      <AnonAadhaarProof code={latestProof} />
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <Key className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-bold text-gray-100">Authentication Status</h3>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Current Status</p>
                <p className={`font-bold ${
                  anonAadhaar.status === "logged-in" 
                    ? "text-green-400" 
                    : anonAadhaar.status === "logging-in" 
                      ? "text-yellow-400" 
                      : "text-red-400"
                }`}>
                  {anonAadhaar.status === "logged-in" 
                    ? "Authenticated" 
                    : anonAadhaar.status === "logging-in" 
                      ? "Authenticating..." 
                      : "Not Authenticated"}
                </p>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Mode</p>
                <p className={`font-bold ${useTestAadhaar ? "text-yellow-400" : "text-green-400"}`}>
                  {useTestAadhaar ? "Test Aadhaar" : "Real Aadhaar"}
                </p>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400">Privacy</p>
                <p className="font-bold text-purple-400">
                  100% Anonymous
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}