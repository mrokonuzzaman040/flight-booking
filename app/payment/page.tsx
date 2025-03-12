"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Calendar, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Payment successful",
        description: "Your booking has been confirmed!",
      })
      router.push("/booking-confirmation")
    }, 2000)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/flight-details/1">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to flight details
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="bkash">bKash</TabsTrigger>
                  <TabsTrigger value="nagad">Nagad</TabsTrigger>
                  <TabsTrigger value="rocket">Rocket</TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="space-y-4 pt-4">
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          className="pl-10"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="pl-10"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="pl-10"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Processing payment..." : "Pay ৳50,000"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="bkash" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center py-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="bKash Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mobile-number">bKash Mobile Number</Label>
                      <Input
                        id="mobile-number"
                        placeholder="01XXXXXXXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Processing payment..." : "Pay with bKash"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="nagad" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center py-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Nagad Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nagad-number">Nagad Mobile Number</Label>
                      <Input
                        id="nagad-number"
                        placeholder="01XXXXXXXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Processing payment..." : "Pay with Nagad"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="rocket" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center py-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Rocket Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rocket-number">Rocket Mobile Number</Label>
                      <Input
                        id="rocket-number"
                        placeholder="01XXXXXXXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Processing payment..." : "Pay with Rocket"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="sticky top-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt="Airline Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Biman Bangladesh Airlines</p>
                      <p className="text-sm text-muted-foreground">BG 178 • Economy</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-muted-foreground">Dhaka (DAC)</p>
                    <p className="text-right">Dubai (DXB)</p>
                    <p className="text-muted-foreground">10 Jun, 10:00</p>
                    <p className="text-right">10 Jun, 12:30</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Fare</span>
                      <span>৳45,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span>৳5,000</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>৳50,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

