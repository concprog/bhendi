import { Account } from './account'
import { WalletOptions } from './wallet-options'
import { useAccount } from 'wagmi'

export default function WalletConnect() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}