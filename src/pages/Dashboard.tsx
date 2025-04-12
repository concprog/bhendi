import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import TradingChart from "../components/trading-chart"
import { motion } from "framer-motion"
import { Wallet, ArrowUpDown, DollarSign, Percent } from "lucide-react"
import { Supply, Borrow, Repay } from "../utils"
import { BigNumber } from "ethers"
import { useAccount, useBalance } from "wagmi"
import { GoogleTranslateWidget } from "@/components/google-translate"

// ETH asset for simplicity
const eth = { 
  name: "Ethereum", 
  symbol: "ETH", 
  amount: 2.5, 
  value: 4000 
}

// Aave asset address for ETH
const aaveAssets = {
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
}

export default function CryptoTradingInterface() {
  const [inputAmount, setInputAmount] = useState("")
  const [activeTab, setActiveTab] = useState("supply")
  const [submitting, setSubmitting] = useState(false)
  
  // Get account and balance from wallet
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({
    address,
    chainId: 11155111, // Sepolia chain ID
  })

  const handlePercentageClick = (percentage) => {
    if (ethBalance) {
      const balance = parseFloat(ethBalance.formatted)
      const newAmount = ((balance * percentage) / 100).toFixed(6)
      setInputAmount(newAmount)
    }
  }

  // Handle the action button click
  const handleActionClick = (action) => {
    if (inputAmount && !isNaN(parseFloat(inputAmount))) {
      setSubmitting(true)
      
      // Create a timeout to reset the submitting state
      // In a real app, this would be handled by the transaction completion
      setTimeout(() => {
        setSubmitting(false)
      }, 3000)
    }
  }

  // Create BigNumber from input only when submitting
  const getAmount = () => {
    if (submitting && inputAmount && !isNaN(parseFloat(inputAmount))) {
      try {
        // Convert ETH to Wei (18 decimals)
        const amountInWei = parseFloat(inputAmount) * 10**18
        return BigNumber.from(Math.floor(amountInWei).toString())
      } catch (error) {
        console.error("Error converting amount to BigNumber:", error)
        return BigNumber.from("0")
      }
    }
    return BigNumber.from("0")
  }

  return (
    <div className="min-h-screen w-screen bg-gray-950 text-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-end mb-4"> {/* Example positioning: top right */}
          <GoogleTranslateWidget />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <TradingChart />
            
            <Card className="bg-gray-900 border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center text-gray-100">
                    <Wallet className="mr-2" /> ETH Balance
                  </h2>
                  <span className="text-2xl font-bold text-green-400">
                    {isConnected && ethBalance 
                      ? `${parseFloat(ethBalance.formatted).toFixed(4)} ETH` 
                      : "Connect Wallet"}
                  </span>
                </div>
                
                {/* Custom Tailwind Tabs */}
                <div className="w-full">
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-3 mb-4">
                    <button
                      onClick={() => setActiveTab("supply")}
                      className={`py-2 px-4 text-center transition-colors duration-200 rounded-tl-lg rounded-tr-lg font-medium text-sm ${
                        activeTab === "supply"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Supply
                    </button>
                    <button
                      onClick={() => setActiveTab("borrow")}
                      className={`py-2 px-4 text-center transition-colors duration-200 font-medium text-sm ${
                        activeTab === "borrow"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Borrow
                    </button>
                    <button
                      onClick={() => setActiveTab("lend")}
                      className={`py-2 px-4 text-center transition-colors duration-200 rounded-tl-lg rounded-tr-lg font-medium text-sm ${
                        activeTab === "lend"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Lend
                    </button>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="mt-4">
                    {/* Supply Tab Content */}
                    <div className={`space-y-4 ${activeTab === "supply" ? "block" : "hidden"}`}>
                      <div className="grid grid-cols-4 gap-2">
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
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Amount ETH"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-gray-200 focus:ring-1 focus:ring-gray-700 focus:border-gray-700 pr-16"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">ETH</span>
                      </div>
                      
                      <div 
                        className="w-full" 
                        onClick={() => !submitting && handleActionClick('supply')}
                      >
                        <Supply 
                          asset={aaveAssets.WETH}
                          amount={getAmount()}
                        />
                      </div>
                    </div>
                    
                    {/* Borrow Tab Content */}
                    <div className={`space-y-4 ${activeTab === "borrow" ? "block" : "hidden"}`}>
                      <div className="grid grid-cols-4 gap-2">
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
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Amount ETH"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-gray-200 pr-16"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">ETH</span>
                      </div>
                      
                      <div 
                        className="w-full" 
                        onClick={() => !submitting && handleActionClick('borrow')}
                      >
                        <Borrow 
                          asset={aaveAssets.WETH}
                          amount={getAmount()}
                        />
                      </div>
                    </div>
                    
                    {/* Lend Tab Content */}
                    <div className={`space-y-4 ${activeTab === "lend" ? "block" : "hidden"}`}>
                      <div className="grid grid-cols-4 gap-2">
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
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Amount ETH"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-gray-200 pr-16"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">ETH</span>
                      </div>
                      
                      <div 
                        className="w-full" 
                        onClick={() => !submitting && handleActionClick('repay')}
                      >
                        <Repay 
                          asset={aaveAssets.WETH}
                          amount={getAmount()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center text-gray-100">
                  <DollarSign className="mr-2" /> Your ETH
                </h2>
                <motion.div 
                  className="bg-gray-800 p-3 rounded-lg mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-100">Ethereum</p>
                      <p className="text-sm text-gray-400">ETH</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-100">
                        {isConnected && ethBalance 
                          ? `${parseFloat(ethBalance.formatted).toFixed(4)}` 
                          : "0.0000"} ETH
                      </p>
                      <p className="text-sm text-gray-400">
                        Sepolia Testnet
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Supply APY</p>
                    <p className="font-bold text-green-400">3.45%</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Borrow APY</p>
                    <p className="font-bold text-blue-400">5.12%</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Lending APY</p>
                    <p className="font-bold text-purple-400">2.87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}