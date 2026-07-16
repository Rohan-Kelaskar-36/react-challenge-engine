interface FilterBarProps {
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
}

export default function FilterBar({
  filter,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div
      id="filter-bar"
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
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
      </button>
    </div>
  )
}