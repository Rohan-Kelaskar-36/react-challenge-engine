import Button from "./Button"
import FormInput from "./FormInput"
import { useTheme } from "../contexts/ThemeContext";

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
  categories?: string[]
  selectedCategory?: string
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
  categories=[],
  selectedCategory="All",
  onCategoryChange
}: FilterBarProps) {

  const { theme } = useTheme();
  
  return (
    <div
      id="filter-bar"
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        alignItems: "center",
        background:
theme==="dark"
? "#222"
: "#f5f5f5",
      }}
    >
      <Button
      variant="danger"
        data-active={filter === "all"}
        onClick={() => onFilterChange("all")}
      >
        All
      </Button>

      <Button
      variant="secondary"
        data-active={filter === "active"}
        onClick={() => onFilterChange("active")}
      >
        Active
      </Button>

      <Button
      variant="primary"
        data-active={filter === "completed"}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </Button>
      <select
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

      
      <FormInput
  label="Search"
  id="search-input"
  value={searchText}
  onChange={(e) =>
    onSearchChange(e.target.value)
  }
/>

{searchText && (
  <Button
    id="clear-search"
    type="button"
    onClick={onClearSearch}
    variant="primary"
  >
    Clear search
  </Button>
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
  