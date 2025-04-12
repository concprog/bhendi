"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import TradingChart from "../components/trading-chart"
import { motion } from "framer-motion"
import { Wallet, ArrowUpDown, DollarSign, Percent } from "lucide-react"
import { upply,  Borrow, Repay } from "../utils"
import { BigNumber } from "ethers"

const assets = [
  { name: "Bitcoin", symbol: "BTC", amount: 0.5, value: 22500 },
  { name: "Ethereum", symbol: "ETH", amount: 2.5, value: 4000 },
  { name: "Cardano", symbol: "ADA", amount: 1000, value: 320 },
  { name: "Solana", symbol: "SOL", amount: 20, value: 400 },
  { name: "Polkadot", symbol: "DOT", amount: 100, value: 600 },
]

// Aave asset addresses (example - replace with actual addresses)
const aaveAssets = {
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
}

export default function CryptoTradingInterface() {
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("")
  const balance = 500
  const [selectedAsset, setSelectedAsset] = useState("BTC")

  const handlePercentageClick = (percentage: number) => {
    const newAmount = ((balance * percentage) / 100).toFixed(2)
    setAmount(newAmount)
    setTotal(newAmount)
  }

  const getAaveAssetAddress = (symbol: string) => {
    switch(symbol) {
      case "BTC": return aaveAssets.WBTC;
      case "ETH": return aaveAssets.WETH;
      default: return aaveAssets.USDC;
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <TradingChart />
            <Card className="bg-gray-900 border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center text-gray-100">
                    <Wallet className="mr-2" /> Balance
                  </h2>
                  <span className="text-2xl font-bold text-green-400">${balance.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[25, 50, 75, 100].map((percent) => (
                        <Button
                          key={percent}
                          variant="outline"
                          className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                          onClick={() => handlePercentageClick(percent)}
                        >
                          <Percent className="mr-1 h-4 w-4" />
                          {percent}%
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Amount BTC"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
                    />
                    <Input
                      type="number"
                      placeholder="Total USDT"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                    <Supply 
                      asset={getAaveAssetAddress(selectedAsset)}
                      amount={BigNumber.from(amount || "0")}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[25, 50, 75, 100].map((percent) => (
                        <Button
                          key={percent}
                          variant="outline"
                          className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                          onClick={() => handlePercentageClick(percent)}
                        >
                          <Percent className="mr-1 h-4 w-4" />
                          {percent}%
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Amount BTC"
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                    <Input
                      type="number"
                      placeholder="Total USDT"
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                    <Borrow 
                      asset={getAaveAssetAddress(selectedAsset)}
                      amount={BigNumber.from(amount || "0")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center text-gray-100">
                  <DollarSign className="mr-2" /> Your Assets
                </h2>
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <motion.div 
                      key={asset.symbol} 
                      className={`bg-gray-800 p-3 rounded-lg cursor-pointer ${selectedAsset === asset.symbol ? "ring-2 ring-green-500" : ""}`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedAsset(asset.symbol)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-100">{asset.name}</p>
                          <p className="text-sm text-gray-400">{asset.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-100">${asset.value.toFixed(2)}</p>
                          <p className="text-sm text-gray-400">
                            {asset.amount} {asset.symbol}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <Repay 
                    asset={getAaveAssetAddress(selectedAsset)}
                    amount={BigNumber.from(amount || "0")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}