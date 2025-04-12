import { useEthersProvider } from "./interface";
import { useAccount } from "wagmi";
import { BigNumber, providers } from 'ethers';
import { EthereumTransactionTypeExtended, PoolBundle } from '@aave/contract-helpers';
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { Pool, InterestRate } from "@aave/contract-helpers";
import { useState } from 'react';

// Helper function to submit transactions
async function submitTransaction({
  provider,
  tx
}: {
  provider: providers.Provider;
  tx: EthereumTransactionTypeExtended;
}) {
  try {
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
    return txResponse;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

// Pool instance creator
function usePool() {
  const provider = useEthersProvider();
  
  if (!provider) {
    throw new Error("Provider is not available");
  }
  
  return new Pool(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });
}

export function Supply({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address, isConnected } = useAccount();
  const provider = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSupply = async () => {
    if (!isConnected) {
      setError("No connected wallet");
      return;
    }
    
    if (!provider) {
      setError("Provider not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // NOTE: Potential issue - PoolBundle might not be correct
      // According to Aave docs, we should be using Pool for supply operations
      const pool = new Pool(provider, {
        POOL: AaveV3Sepolia.POOL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
      });

      const txs = await pool.supply({
        user: address,
        reserve: asset,
        amount: amount.toString(),
      });

      const txResponse = await submitTransaction({
        provider,
        tx: txs[0], // Get the first transaction
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Supply failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleSupply} 
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Supplying...
          </>
        ) : "Supply ETH"}
      </button>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {txHash && (
        <p className="text-green-400 text-sm mt-2">
          Transaction: <span className="font-mono">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
        </p>
      )}
    </div>
  );
}

export function Borrow({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address, isConnected } = useAccount();
  const provider = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleBorrow = async () => {
    if (!isConnected) {
      setError("No connected wallet");
      return;
    }
    
    if (!provider) {
      setError("Provider not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const pool = new Pool(provider, {
        POOL: AaveV3Sepolia.POOL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
      });

      const txs = await pool.borrow({
        user: address,
        reserve: asset,
        amount: amount.toString(), // Should be string for the Aave SDK
        interestRateMode: InterestRate.Variable,
        onBehalfOf: address, // Adding this parameter which might be required
      });

      const txResponse = await submitTransaction({
        provider,
        tx: txs[0],
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Borrow failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleBorrow} 
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Borrowing...
          </>
        ) : "Borrow ETH"}
      </button>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {txHash && (
        <p className="text-green-400 text-sm mt-2">
          Transaction: <span className="font-mono">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
        </p>
      )}
    </div>
  );
}

export function Repay({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address, isConnected } = useAccount();
  const provider = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleRepay = async () => {
    if (!isConnected) {
      setError("No connected wallet");
      return;
    }
    
    if (!provider) {
      setError("Provider not available");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const pool = new Pool(provider, {
        POOL: AaveV3Sepolia.POOL_IMPL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
      });

      const txs = await pool.repay({
        user: address,
        reserve: asset,
        amount: amount.toString(), // Convert BigNumber to string
        interestRateMode: InterestRate.Variable,
        onBehalfOf: address, // Adding this parameter which might be required
      });

      const txResponse = await submitTransaction({
        provider,
        tx: txs[0],
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Repay failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={handleRepay} 
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Repaying...
          </>
        ) : "Repay ETH"}
      </button>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {txHash && (
        <p className="text-green-400 text-sm mt-2">
          Transaction: <span className="font-mono">{txHash.slice(0, 10)}...{txHash.slice(-8)}</span>
        </p>
      )}
    </div>
  );
}