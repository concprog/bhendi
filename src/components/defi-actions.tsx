"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { BigNumber, providers } from "ethers";
import { useAccount } from "wagmi";
import {
  EthereumTransactionTypeExtended,
  Pool,
  PoolBundle,
  InterestRate,
} from "@aave/contract-helpers";
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { useEthersProvider } from "../interface"; // adjust if needed

// ----- On-chain helpers -----
async function submitTransaction({
  provider,
  tx,
}: {
  provider: providers.Provider;
  tx: EthereumTransactionTypeExtended;
}) {
  const extendedTxData = await tx.tx();
  const { from, ...txData } = extendedTxData;
  const signer = (provider as providers.Web3Provider).getSigner(from);
  const txResponse = await signer.sendTransaction({
    ...txData,
    value: txData.value ? BigNumber.from(txData.value) : undefined,
  });
  return txResponse;
}

function getPool(provider: providers.Provider) {
  return new Pool(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });
}

async function handleSupply(address: string, asset: string, amount: BigNumber, provider: providers.Provider) {
  const poolBundle = new PoolBundle(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });

  const tx = await poolBundle.supply({
    user: address,
    reserve: asset,
    amount: amount.toString(),
  });

  return submitTransaction({ provider, tx });
}

async function handleBorrow(address: string, asset: string, amount: BigNumber, provider: providers.Provider) {
  const pool = getPool(provider);

  const tx = await pool.borrow({
    user: address,
    reserve: asset,
    amount: amount.toString(),
    interestRateMode: InterestRate.Variable,
  });

  return submitTransaction({ provider, tx });
}

async function handleRepay(address: string, asset: string, amount: BigNumber, provider: providers.Provider) {
  const pool = getPool(provider);

  const tx = await pool.repay({
    user: address,
    reserve: asset,
    amount: amount.toString(),
    interestRateMode: InterestRate.Variable,
  });

  return submitTransaction({ provider, tx });
}

// ----- UI Component -----
export default function DeFiActions() {
  const { address, isConnected } = useAccount();
  const provider = useEthersProvider();

  const [asset, setAsset] = useState("0xc4bF5CbDaBE595361438F8c6a187bDc330539c60"); // Example DAI address
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState({
    supply: false,
    borrow: false,
    repay: false,
  });

  const handleSubmit = async (action: "supply" | "borrow" | "repay") => {
    if (!amount || !isConnected || !address) return;

    const amountInWei = BigNumber.from(amount).mul(BigNumber.from(10).pow(18));
    setIsLoading((prev) => ({ ...prev, [action]: true }));

    try {
      switch (action) {
        case "supply":
          await handleSupply(address, asset, amountInWei, provider);
          break;
        case "borrow":
          await handleBorrow(address, asset, amountInWei, provider);
          break;
        case "repay":
          await handleRepay(address, asset, amountInWei, provider);
          break;
      }
      setAmount("");
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <Card className="bg-gray-900 border-0 shadow-lg">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-gray-100 mb-4">DeFi Actions</h2>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Asset Address"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
          />

          <Input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
          />

          <div className="grid grid-cols-3 gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleSubmit("supply")}
              disabled={!amount || !isConnected || isLoading.supply}
            >
              {isLoading.supply ? "Loading..." : "Supply"}
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleSubmit("borrow")}
              disabled={!amount || !isConnected || isLoading.borrow}
            >
              {isLoading.borrow ? "Loading..." : "Borrow"}
            </Button>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => handleSubmit("repay")}
              disabled={!amount || !isConnected || isLoading.repay}
            >
              {isLoading.repay ? "Loading..." : "Repay"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
