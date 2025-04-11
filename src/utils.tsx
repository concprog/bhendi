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
  
  return new Pool(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });
}

export function Supply({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSupply = async () => {
    if (!address) {
      setError("No connected wallet");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const poolBundle = new PoolBundle(provider, {
        POOL: AaveV3Sepolia.POOL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
      });

      const supplyBundle = await poolBundle.supplyBundle({
        user: address,
        asset,
        amount,
      });

      const txResponse = await submitTransaction({
        provider,
        tx: supplyBundle,
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Supply failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSupply} disabled={isLoading}>
        {isLoading ? "Supplying..." : "Supply"}
      </button>
      {error && <p className="error">{error}</p>}
      {txHash && <p>Transaction: {txHash}</p>}
    </div>
  );
}

export function Borrow({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address } = useAccount();
  const pool = usePool();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleBorrow = async () => {
    if (!address) {
      setError("No connected wallet");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const txs = await pool.borrow({
        user: address,
        reserve: asset,
        amount,
        interestRateMode: InterestRate.Variable,
      });

      const txResponse = await submitTransaction({
        provider: pool.provider,
        tx: txs[0], // Assuming first transaction is the main one
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Borrow failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleBorrow} disabled={isLoading}>
        {isLoading ? "Borrowing..." : "Borrow"}
      </button>
      {error && <p className="error">{error}</p>}
      {txHash && <p>Transaction: {txHash}</p>}
    </div>
  );
}

export function Repay({ asset, amount }: { asset: string; amount: BigNumber }) {
  const { address } = useAccount();
  const pool = usePool();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleRepay = async () => {
    if (!address) {
      setError("No connected wallet");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const txs = await pool.repay({
        user: address,
        reserve: asset,
        amount,
        interestRateMode: InterestRate.Variable,
      });

      const txResponse = await submitTransaction({
        provider: pool.provider,
        tx: txs[0], // Assuming first transaction is the main one
      });

      setTxHash(txResponse.hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Repay failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRepay} disabled={isLoading}>
        {isLoading ? "Repaying..." : "Repay"}
      </button>
      {error && <p className="error">{error}</p>}
      {txHash && <p>Transaction: {txHash}</p>}
    </div>
  );
}