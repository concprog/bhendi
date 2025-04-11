import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="w-[20%] border-2 border-gray-300 rounded-lg p-2 m-3 bg-black text-white hover:border-green-600 hover:text-yellow-300 transition duration-150 ease-in-out hover:shadow-[0_0_17px_rgba(74,222,128,0.7)]"
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </button>
  );
}
