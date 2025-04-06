"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="flex justify-between items-center mb-8">
      <Link href="/">
        <h1 className="text-3xl font-bold">ShopEasy</h1>
      </Link>
      <Link href="/cart">
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </Link>
    </header>
  )
}

