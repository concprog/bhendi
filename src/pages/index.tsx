import { useRouter } from 'next/router';
import { useAnonAadhaar } from '@anon-aadhaar/react';
import { useEffect } from 'react';
import WalletConnect from "../components/walletconnect"

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  useEffect(() => {
    if (anonAadhaar.status === 'logged-in') {
      router.push('/aadhaar');
    }
  }, [anonAadhaar.status, router]);

  if (anonAadhaar.status === 'logged-in') {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Bhendi!</h1>
      <WalletConnect/>
      <p>You're successfully logged in with AnonAadhaar!</p>
    </div>
  );
}