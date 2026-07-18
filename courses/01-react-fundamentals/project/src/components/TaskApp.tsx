import type { Dispatch, SetStateAction } from 'react'
import TaskList, { Task } from "./TaskList"
import TaskForm from "./TaskForm"
import { useState,useEffect } from "react"
import FilterBar from "./FilterBar"

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  // dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
      showFilterBar?: boolean
  // showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  // linkToTaskDetail?: boolean
}

export default function TaskApp({
 tasks = [],
 setTasks,
 showForm,
 showFilterBar,
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


    // const completedCount = tasks.filter((task) => task.completed).length

    const [filter, setFilter] = useState<
  "all" | "active" | "completed"
>("all")
const [sortOrder, setSortOrder] = useState<
  "recent" | "high" | "low" | "alphabetical"
>("recent")

const [editingId, setEditingId] = useState<
  string | number | null
>(null)

const [searchText, setSearchText] = useState("")
const [debouncedSearchText, setDebouncedSearchText] = useState("")
const [isSearching, setIsSearching] = useState(false)

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

const searchedTasks = filteredTasks.filter((task) =>
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




   return (
    <>
  
      {/* <p id="task-count">
  Showing {filteredTasks.length} of {tasks.length} tasks
</p> */}

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
     <TaskList tasks={sortedTasks}  onToggle={handleToggle} onDelete={onDelete} countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}  
     editingId={editingId}
  setEditingId={setEditingId}
  onUpdateTask={handleUpdateTask} />
    </>
  )
}




