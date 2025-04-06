"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import ProductList from "@/components/product-list"
import CategoryFilter from "@/components/category-filter"
import { Button } from "@/components/ui/button"

// Get unique categories from products
const categories = ["Clothing", "Footwear", "Electronics", "Accessories"]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ShopEasy</h1>
        <Link href="/cart">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>
        </Link>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ProductList category={selectedCategory} />
      </section>
    </div>
  )
}

