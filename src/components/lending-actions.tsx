// lending-actions.tsx
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useSimpleLending } from './simplelending';

export const useLendingActions = (contractAddress: string) => {
  const { address } = useAccount();
  const lending = useSimpleLending(contractAddress);
  const [userDebt, setUserDebt] = useState('0');
  const [userSupplied, setUserSupplied] = useState('0');
  const [availableLiquidity, setAvailableLiquidity] = useState('0');

  // Refresh user data
  const refreshData = async () => {
    if (!address) return;
    
    try {
      const [debt, info, liquidity] = await Promise.all([
        lending.calculateDebt(address),
        lending.getUserInfo(address),
        lending.availableLiquidity()
      ]);
      
      setUserDebt(debt);
      setUserSupplied(info.suppliedAmount);
      setAvailableLiquidity(liquidity);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  // Initial load and refresh when address changes
  useEffect(() => {
    refreshData();
  }, [address, contractAddress]);

  return {
    address,
    userDebt,
    userSupplied,
    availableLiquidity,
    refreshData,
    lending
  };
};

export function Supply({ contractAddress }: { contractAddress: string }) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const { lending, refreshData } = useLendingActions(contractAddress);

  const handleSupply = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const tx = await lending.supply(amount);
      setTxHash(tx.hash);
      await tx.wait();
      await refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Supply failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="action-card">
      <h3>Supply Assets</h3>
      <div className="balance">Supplied: {userSupplied}</div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to supply"
        min="0"
        step="0.01"
      />
      <button 
        onClick={handleSupply} 
        disabled={isLoading || !amount}
      >
        {isLoading ? 'Supplying...' : 'Supply'}
      </button>
      {error && <div className="error">{error}</div>}
      {txHash && (
        <div className="tx-link">
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View Transaction
          </a>
        </div>
      )}
    </div>
  );
}

export function Borrow({ contractAddress }: { contractAddress: string }) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const { lending, availableLiquidity, userSupplied, refreshData } = useLendingActions(contractAddress);

  const handleBorrow = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Validate against available liquidity and collateral
      if (parseFloat(amount) > parseFloat(availableLiquidity)) {
        throw new Error('Not enough liquidity in the pool');
      }
      
      if (parseFloat(amount) > parseFloat(userSupplied)) {
        throw new Error('Borrow amount exceeds collateral');
      }

      const tx = await lending.borrow(amount);
      setTxHash(tx.hash);
      await tx.wait();
      await refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Borrow failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="action-card">
      <h3>Borrow Assets</h3>
      <div className="balance">Available: {availableLiquidity}</div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to borrow"
        min="0"
        step="0.01"
      />
      <button 
        onClick={handleBorrow} 
        disabled={isLoading || !amount}
      >
        {isLoading ? 'Borrowing...' : 'Borrow'}
      </button>
      {error && <div className="error">{error}</div>}
      {txHash && (
        <div className="tx-link">
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View Transaction
          </a>
        </div>
      )}
    </div>
  );
}

export function Repay({ contractAddress }: { contractAddress: string }) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const { lending, userDebt, refreshData } = useLendingActions(contractAddress);

  const handleRepay = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Validate against current debt
      if (parseFloat(amount) > parseFloat(userDebt)) {
        throw new Error('Repay amount exceeds debt');
      }

      const tx = await lending.repay(amount);
      setTxHash(tx.hash);
      await tx.wait();
      await refreshData();
      setAmount(''); // Clear input after successful repayment
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Repay failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="action-card">
      <h3>Repay Debt</h3>
      <div className="balance">Current Debt: {userDebt}</div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to repay"
        min="0"
        step="0.01"
      />
      <button 
        onClick={handleRepay} 
        disabled={isLoading || !amount}
      >
        {isLoading ? 'Repaying...' : 'Repay'}
      </button>
      <button 
        className="max-button"
        onClick={() => setAmount(userDebt)}
      >
        MAX
      </button>
      {error && <div className="error">{error}</div>}
      {txHash && (
        <div className="tx-link">
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View Transaction
          </a>
        </div>
      )}
    </div>
  );
}