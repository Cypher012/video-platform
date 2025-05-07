"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function WalletCard() {
  const [amount, setAmount] = useState("50")
  const [paymentMethod, setPaymentMethod] = useState("card1")

  // Sample transaction history
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 100,
      date: new Date(2025, 4, 5), // May 5, 2025
      description: "Wallet top-up",
    },
    {
      id: 2,
      type: "payment",
      amount: 59.99,
      date: new Date(2025, 4, 3), // May 3, 2025
      description: "Session with Sophia Rose",
    },
    {
      id: 3,
      type: "deposit",
      amount: 200,
      date: new Date(2025, 3, 28), // April 28, 2025
      description: "Wallet top-up",
    },
    {
      id: 4,
      type: "payment",
      amount: 89.99,
      date: new Date(2025, 3, 25), // April 25, 2025
      description: "Session with Jessica Diamond",
    },
  ]

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="bg-black/60 border-rose-900/30 shadow-glow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-white">My Wallet</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/95 border border-rose-900/50 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Add Funds to Your Wallet</DialogTitle>
                <DialogDescription className="text-rose-100/70">
                  Top up your wallet to book sessions with performers.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-rose-100">
                    Amount
                  </Label>
                  <div className="flex gap-2">
                    {["20", "50", "100", "200"].map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={amount === value ? "default" : "outline"}
                        className={
                          amount === value
                            ? "bg-rose-600 hover:bg-rose-700 text-white flex-1"
                            : "border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 flex-1"
                        }
                        onClick={() => setAmount(value)}
                      >
                        ${value}
                      </Button>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500">$</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 bg-rose-950/20 border-rose-500/30 text-white focus-visible:ring-rose-500 focus-visible:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-rose-100">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 rounded-md border border-rose-500/30 p-3">
                      <RadioGroupItem value="card1" id="card1" className="border-rose-500/30 text-rose-500" />
                      <Label htmlFor="card1" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-rose-500" />
                          <span className="text-white">•••• •••• •••• 4242</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border border-rose-500/30 p-3">
                      <RadioGroupItem value="card2" id="card2" className="border-rose-500/30 text-rose-500" />
                      <Label htmlFor="card2" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-rose-500" />
                          <span className="text-white">•••• •••• •••• 5555</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border border-rose-500/30 p-3">
                      <RadioGroupItem value="new-card" id="new-card" className="border-rose-500/30 text-rose-500" />
                      <Label htmlFor="new-card" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <Plus className="h-4 w-4 mr-2 text-rose-500" />
                          <span className="text-white">Add new payment method</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm mt-4">
                  Add ${amount} to Wallet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-rose-100/70">Current Balance</p>
              <p className="text-3xl font-bold text-white">$149.99</p>
            </div>
            <div className="h-12 w-12 bg-rose-900/30 rounded-full flex items-center justify-center border border-rose-500/30">
              <Wallet className="h-6 w-6 text-rose-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-rose-100/70">
            <p>Estimated usage: 3 more sessions</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-rose-950/10 border border-rose-900/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    transaction.type === "deposit" ? "bg-green-900/30 text-green-500" : "bg-rose-900/30 text-rose-500"
                  }`}
                >
                  {transaction.type === "deposit" ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">{transaction.description}</p>
                  <p className="text-xs text-rose-100/70">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className={`font-medium ${transaction.type === "deposit" ? "text-green-500" : "text-rose-400"}`}>
                {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="border-rose-500/30 text-rose-400 hover:bg-rose-950/30 hover:text-rose-300"
          >
            View All Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
