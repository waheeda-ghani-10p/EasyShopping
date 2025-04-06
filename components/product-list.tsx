"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Casual T-Shirt",
    price: 29.99,
    image: "/images/tshirt.jpg",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 89.99,
    image: "/images/shoes.jpg",
    category: "Footwear",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "/images/backpack.jpg",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 199.99,
    image: "/images/smartwatch.jpg",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 49.99,
    image: "/images/sunglasses.jpg",
    category: "Accessories",
  },
]

interface ProductListProps {
  category?: string | null
}

export default function ProductList({ category }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // Filter products when category changes
  useEffect(() => {
    if (category) {
      setFilteredProducts(allProducts.filter((product) => product.category === category))
    } else {
      setFilteredProducts(allProducts)
    }
  }, [category])

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

