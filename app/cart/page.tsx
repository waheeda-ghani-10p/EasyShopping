"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart()

  const subtotal = getTotal()
  const shipping = items.length > 0 ? 5.99 : 0
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <Link href="/" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-4">
                    <div className="relative h-20 w-20 rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-4" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

