interface FilterBarProps {
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
  sortOrder: "recent" | "high" | "low" | "alphabetical" | "dueDate"
  onSortChange: (
    sort: "recent" | "high" | "low" | "alphabetical" | "dueDate"
  ) => void

  searchText: string
  onSearchChange: (text: string) => void
  onClearSearch: () => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function FilterBar({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
  searchText,
  onSearchChange,
  onClearSearch,
  categories,
  selectedCategory,
  onCategoryChange
}: FilterBarProps) {
  
  return (
    <div
      id="filter-bar"
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        alignItems: "center",
      }}
    >
      <button
        data-active={filter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>

      <button
        data-active={filter === "active"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>

      <button
        data-active={filter === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button><select
        id="sort-order"
        value={sortOrder}
        onChange={(e) =>
          onSortChange(
            e.target.value as
              | "recent"
              | "high"
              | "low"
              | "alphabetical"
          )
        }
      >
        <option value="recent">
          Recently Added
        </option>

        <option value="high">
          Priority: High to Low
        </option>

        <option value="low">
          Priority: Low to High
        </option>

        <option value="alphabetical">
          Alphabetical
        </option>

        <option value="dueDate">
  Due Date (Soonest First)
</option>
      </select>

      
      <input
  // id="search-input"
  type="text"
  placeholder="Search tasks..."
  value={searchText}
  onChange={(e) => onSearchChange(e.target.value)}
/>

{searchText && (
  <button
    id="clear-search"
    type="button"
    onClick={onClearSearch}
  >
    Clear search
  </button>
)}
  <select
  id="category-filter"
  value={selectedCategory}
  onChange={(e) =>
    onCategoryChange(e.target.value)
  }
>
  <option value="All">
    All Categories
  </option>

  {categories.map(category => (
    <option
      key={category}
      value={category}
    >
      {category}
    </option>
  ))}
</select>
    </div>
  )
}
  