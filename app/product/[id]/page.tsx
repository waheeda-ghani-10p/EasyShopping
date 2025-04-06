"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"

// Mock product data with the same images as in the product cards
const products = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: 29.99,
    description:
      "A comfortable and stylish t-shirt perfect for everyday wear. Made from 100% cotton with a relaxed fit.",
    image: "/images/tshirt.jpg", // Updated to match product card image
    category: "Clothing",
    features: ["100% cotton material", "Relaxed fit", "Machine washable", "Available in multiple colors"],
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 89.99,
    description:
      "Lightweight and responsive running shoes designed for maximum comfort and performance on any terrain.",
    image: "/images/shoes.jpg", // Updated to match product card image
    category: "Footwear",
    features: [
      "Breathable mesh upper",
      "Cushioned midsole",
      "Durable rubber outsole",
      "Reflective details for visibility",
    ],
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 129.99,
    description:
      "Premium wireless headphones with noise cancellation and exceptional sound quality for an immersive audio experience.",
    image: "/images/headphones.jpg", // Updated to match product card image
    category: "Electronics",
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
    ],
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    description:
      "Versatile and durable backpack with multiple compartments, perfect for daily commutes or weekend adventures.",
    image: "/images/backpack.jpg", // Updated to match product card image
    category: "Accessories",
    features: [
      "Water-resistant material",
      "Padded laptop sleeve",
      "Adjustable shoulder straps",
      "Multiple organization pockets",
    ],
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 199.99,
    description:
      "Feature-packed smartwatch that tracks your fitness, monitors your health, and keeps you connected on the go.",
    image: "/images/smartwatch.jpg", // Updated to match product card image
    category: "Electronics",
    features: ["Heart rate monitoring", "GPS tracking", "Water-resistant design", "Customizable watch faces"],
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 49.99,
    description: "Stylish sunglasses with UV protection, designed to complement any outfit while protecting your eyes.",
    image: "/images/sunglasses.jpg", // Updated to match product card image
    category: "Accessories",
    features: ["100% UV protection", "Polarized lenses", "Durable frame", "Includes protective case"],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Fetch product data based on ID
  useEffect(() => {
    const productId = Number.parseInt(params.id)
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
    }

    setIsLoaded(true)
  }, [params.id])

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    if (!product) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add the item to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }

      setIsLoading(false)
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
      })
    }, 500)
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  // Show not found state
  if (isLoaded && !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Link href="/" className="flex items-center text-sm mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Product not found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <Link href="/" className="flex items-center text-sm mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product?.image || "/placeholder.svg"}
            alt={product?.name || "Product"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>

        <div>
          <div className="mb-2">
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">{product?.category}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
          <p className="text-2xl font-bold mb-4">${product?.price.toFixed(2)}</p>

          <p className="text-muted-foreground mb-6">{product?.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {product?.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart} disabled={isLoading}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

