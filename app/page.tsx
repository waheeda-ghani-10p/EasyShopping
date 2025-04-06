"use client"

import { useState } from "react"
import ProductList from "@/components/product-list"
import CategoryFilter from "@/components/category-filter"
import Header from "@/components/header"

// Get unique categories from products
const categories = ["Clothing", "Footwear", "Electronics", "Accessories"]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
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

