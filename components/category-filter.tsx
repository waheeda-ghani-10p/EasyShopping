"use client"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          selectedCategory === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

