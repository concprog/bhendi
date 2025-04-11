import { useEthersProvider } from "./interface";
import { useAccount } from "wagmi";
import { BigNumber, providers } from 'ethers';
import { EthereumTransactionTypeExtended, PoolBundle } from '@aave/contract-helpers';
import { AaveV3Sepolia } from "@bgd-labs/aave-address-book";
import { Pool, InterestRate } from "@aave/contract-helpers";

function submitTransaction({
  provider: ethers.providers.provider,  // Signing transactions requires a wallet provider
  tx: EthereumTransactionTypeExtended
}){
  const extendedTxData = await tx.tx();
  const { from, ...txData } = extendedTxData;
  const signer = provider.getSigner(from);
  const txResponse = await signer.sendTransaction({
    ...txData,
    value: txData.value ? BigNumber.from(txData.value) : undefined,
  });
}

function getPool(){
    const provider = useEthersProvider();
    
    const pool = new Pool(provider, {
        POOL: AaveV3Sepolia.POOL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
    })
    
    return pool;
}

export function supply(asset:string, amount:BigNumber){
    const address = useAccount();
    const poolBundle = new PoolBundle(useEthersProvider(), {
        POOL: AaveV3Sepolia.POOL,
        WETH_GATEWAY: AaveV3Sepolia.WETH_GATEWAY,
    })
    const supplyBundle = await poolBundle.supplyBundle({
        address,
        asset,
        amount,
      })
    return submitTransaction(supplyBundle);    
}

export function borrow(asset: string, amount: BigNumber){
    const address = useAccount();
    const pool = getPool();
    const txns = await pool.Borrow(address, asset, amount, InterestRate.Variable);
    return submitTransaction(txns);
}

export function repay(asset: string, amount: BigNumber){
    const address = useAccount();
    const pool = getPool();
    const txs: EthereumTransactionTypeExtended[] = await pool.repay({
        address,
        asset,
        amount,
        InterestRate,
    );
    return submitTransaction(txs);
}