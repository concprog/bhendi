import { useEthersProvider } from "./interface";
import { useAccount } from "wagmi";
import { BigNumber, providers } from "ethers";
import {
  EthereumTransactionTypeExtended,
  PoolBundle,
  Pool,
  InterestRate,
} from "@aave/contract-helpers";
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";

// Helper to submit a transaction
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

  return txResponse; // Optional: return transaction response
}

// Initialize Aave Pool
function getPool(provider: providers.Provider) {
  return new Pool(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });
}

// Supply assets
export async function supply(asset: string, amount: BigNumber) {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const poolBundle = new PoolBundle(provider, {
    POOL: AaveV3Sepolia.POOL,
    WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
  });

  const supplyTx = await poolBundle.supplyBundle({
    address,
    asset,
    amount,
  });

  return submitTransaction({ provider, tx: supplyTx });
}

// Borrow assets
export async function borrow(asset: string, amount: BigNumber) {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const pool = getPool(provider);

  const borrowTx = await pool.borrow({
    user: address,
    reserve: asset,
    amount: amount.toString(),
    interestRateMode: InterestRate.Variable,
  });

  return submitTransaction({ provider, tx: borrowTx });
}

<<<<<<< Updated upstream
export function repay(asset: string, amount: BigNumber){
    const address = useAccount();
    const pool = getPool();
    const txs: EthereumTransactionTypeExtended[] = await pool.repay({
        address,
        asset,
        amount,
        InterestRate.Variable,
});
    return submitTransaction(txs);
}
=======
// Repay assets
export async function repay(asset: string, amount: BigNumber) {
  const { address } = useAccount();
  const provider = useEthersProvider();
  const pool = getPool(provider);

  const repayTx = await pool.repay({
    user: address,
    reserve: asset,
    amount: amount.toString(),
    interestRateMode: InterestRate.Variable,
  });

  return submitTransaction({ provider, tx: repayTx });
}
>>>>>>> Stashed changes
