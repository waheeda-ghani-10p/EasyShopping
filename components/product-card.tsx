"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast()
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add the item to cart
      addItem(product)

      setIsLoading(false)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }, 500)
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={imageError ? "/placeholder.svg?height=300&width=300" : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="mb-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{product.category}</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:underline">{product.name}</h3>
        </Link>
        <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button onClick={handleAddToCart} className="w-full" disabled={isLoading}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

