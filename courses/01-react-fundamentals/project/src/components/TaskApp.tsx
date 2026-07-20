import type { Dispatch, SetStateAction } from 'react'
import TaskList, { Task } from "./TaskList"
import TaskForm from "./TaskForm"
import { useMemo,useState,useEffect } from "react"
import FilterBar from "./FilterBar"
import StatsPanel from "./StatsPanel"
import { useTheme } from "../contexts/ThemeContext";
import Button from './Button'

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  // dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
      showFilterBar?: boolean
      showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  // linkToTaskDetail?: boolean
}

export default function TaskApp({
 tasks = [],
 setTasks,
 showForm,
 showFilterBar,
 showStatsPanel,
 onDelete,
}: TaskAppProps) {
  const handleAddTask = (task: Task) => {
    setTasks?.((prev) => [...prev, task])
  }

  const handleToggle = (id: string | number) => {
    setTasks?.((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }
  const { theme, toggleTheme } = useTheme();


    // const completedCount = tasks.filter((task) => task.completed).length

    const [filter, setFilter] = useState<
  "all" | "active" | "completed"
>("all")
const [sortOrder, setSortOrder] = useState<
  "recent" | "high" | "low" | "alphabetical" | "dueDate"
>("recent")

const [editingId, setEditingId] = useState<
  string | number | null
>(null)

const [searchText, setSearchText] = useState("")
const [debouncedSearchText, setDebouncedSearchText] = useState("")
const [isSearching, setIsSearching] = useState(false)

const [selectedCategory, setSelectedCategory] =
useState("All")

const categories = [
  ...new Set(
    tasks
      .map(task => task.category)
      .filter(Boolean)
  ),
]
const filteredTasks =
  filter === "active"
    ? tasks.filter((task) => !task.completed)
    : filter === "completed"
    ? tasks.filter((task) => task.completed)
    : tasks


    const priorityValue = {
  High: 3,
  Medium: 2,
  Low: 1,
}


useEffect(() => {
  if (searchText === debouncedSearchText) {
    setIsSearching(false)
    return
  }

  setIsSearching(true)

  const timeout = setTimeout(() => {
    setDebouncedSearchText(searchText)
    setIsSearching(false)
  }, 300)

  return () => clearTimeout(timeout)
}, [searchText, debouncedSearchText])

const categoryFilteredTasks =
  selectedCategory === "All"
    ? filteredTasks
    : filteredTasks.filter(
        task =>
          task.category === selectedCategory
      )
const searchedTasks = categoryFilteredTasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(debouncedSearchText.toLowerCase()) ||

  task.description
    .toLowerCase()
    .includes(debouncedSearchText.toLowerCase())
)

const sortedTasks = [...searchedTasks].sort((a, b) => {
  switch (sortOrder) {
    case "high":
      return (
        priorityValue[b.priority as keyof typeof priorityValue] -
        priorityValue[a.priority as keyof typeof priorityValue]
      )

    case "low":
      return (
        priorityValue[a.priority as keyof typeof priorityValue] -
        priorityValue[b.priority as keyof typeof priorityValue]
      )

    case "alphabetical":
      return a.title.localeCompare(
        b.title,
        undefined,
        { sensitivity: "base" }
      )
      case "dueDate": {
  const aTime = a.dueDate
    ? new Date(a.dueDate).getTime()
    : Number.MAX_SAFE_INTEGER

  const bTime = b.dueDate
    ? new Date(b.dueDate).getTime()
    : Number.MAX_SAFE_INTEGER

  return aTime - bTime
}

    default:
      return Number(a.id) - Number(b.id)
  }
})

const handleUpdateTask = (
  id: string | number,
  updates: Pick<Task, "title" | "description" | "priority">
) => {
  if (!updates.title.trim()) return

  setTasks?.((prev) =>
    prev.map((task) =>
      task.id === id
        ? { ...task, ...updates }
        : task
    )
  )

  setEditingId(null)
}



const stats = useMemo(() => {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const active = total - completed;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = tasks.filter((task) => {
    if (!task.dueDate || task.completed) {
      return false;
    }

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }).length;

  const completionPercentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const categoryBreakdown = tasks.reduce(
    (acc, task) => {
      acc[task.category] =
        (acc[task.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const priorityBreakdown = tasks.reduce(
    (acc, task) => {
      acc[task.priority] =
        (acc[task.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    total,
    completed,
    active,
    overdue,
    completionPercentage,
    categoryBreakdown,
    priorityBreakdown,
  };
}, [tasks]);


   return (
    <div
  data-theme={theme}
  style={{
    background:
      theme === "dark"
        ? "#222"
        : "#fff",
    color:
      theme === "dark"
        ? "#fff"
        : "#111",
    minHeight: "100vh",
    padding: "20px",
  }}
>
  <Button
      id="theme-toggle"
      variant="secondary"
      onClick={toggleTheme}
    >
      {theme === "dark"
        ? "Light Mode"
        : "Dark Mode"}
    </Button>
      

     {showForm && (
      <TaskForm onAddTask={handleAddTask} />
     )}
{showFilterBar && (
  <FilterBar
    filter={filter}
    onFilterChange={setFilter}
    sortOrder={sortOrder}
    onSortChange={setSortOrder}
    searchText={searchText}
    onSearchChange={setSearchText}
    onClearSearch={() => setSearchText("")}
    categories={categories}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
  />
)}

{isSearching && (
  <p id="searching-indicator">
    Searching...
  </p>
)}
{sortedTasks.length === 0 && (
  <p id="filter-empty-message">
    {searchText
  ? `No tasks found for "${searchText}"`
  : "No tasks match this filter"}
  </p>
)}
{showStatsPanel && (
  <StatsPanel
    {...stats}
  />
)}
     <TaskList tasks={sortedTasks}  onToggle={handleToggle} onDelete={onDelete} countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}  
     editingId={editingId}
  setEditingId={setEditingId}
  onUpdateTask={handleUpdateTask} />
    </div>
  )
}




