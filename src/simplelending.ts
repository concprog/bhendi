import { ethers } from 'ethers';
import { useEthersProvider, useEthersSigner } from './interface';
import SimpleLendingABI from '../public/SimpleLendingABI.json'; // Your compiled ABI
import { useAccount } from 'wagmi';

interface SimpleLendingContract {
  // Contract Methods
  supply: (amount: string) => Promise<void>;
  borrow: (amount: string) => Promise<void>;
  repay: (amount: string) => Promise<void>;
  withdraw: (amount: string) => Promise<void>;
  
  // View Methods
  calculateDebt: (user: string) => Promise<string>;
  availableLiquidity: () => Promise<string>;
  getUserInfo: (user: string) => Promise<{
    suppliedAmount: string;
    borrowedAmount: string;
    lastInterestUpdate: string;
  }>;
  
  // Contract Address
  address: string;
}

export const useSimpleLending = (contractAddress: string): SimpleLendingContract => {

    const provider = useEthersSigner();
  
    const contract = new ethers.Contract(
    contractAddress,
    SimpleLendingABI,
    provider,
  );
  
  // If the provider is a Signer, we can use it directly for write operations
  const signerContract = provider instanceof ethers.Signer ? contract : null;

  return {
    supply: async (amount: string) => {
      if (!signerContract) throw new Error('No signer available');
      const tx = await signerContract.supply(ethers.utils.parseEther(amount));
      await tx.wait();
    },
    borrow: async (amount: string) => {
      if (!signerContract) throw new Error('No signer available');
      const tx = await signerContract.borrow(ethers.utils.parseEther(amount));
      await tx.wait();
    },
    repay: async (amount: string) => {
      if (!signerContract) throw new Error('No signer available');
      const tx = await signerContract.repay(ethers.utils.parseEther(amount));
      await tx.wait();
    },
    withdraw: async (amount: string) => {
      if (!signerContract) throw new Error('No signer available');
      const tx = await signerContract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
    },
    calculateDebt: async (user: string) => {
      const debt = await contract.calculateDebt(user);
      return ethers.utils.formatEther(debt);
    },
    availableLiquidity: async () => {
      const liquidity = await contract.availableLiquidity();
      return ethers.utils.formatEther(liquidity);
    },
    getUserInfo: async (user: string) => {
      const info = await contract.users(user);
      return {
        suppliedAmount: ethers.utils.formatEther(info.suppliedAmount),
        borrowedAmount: ethers.utils.formatEther(info.borrowedAmount),
        lastInterestUpdate: info.lastInterestUpdate.toString(),
      };
    },
    address: contractAddress,
  };
};