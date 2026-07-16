import type { Dispatch, SetStateAction } from 'react'
import TaskList, { Task } from "./TaskList"
import TaskForm from "./TaskForm"
import { useState } from "react"
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


    const completedCount = tasks.filter((task) => task.completed).length

    const [filter, setFilter] = useState<
  "all" | "active" | "completed"
>("all")

const filteredTasks =
  filter === "active"
    ? tasks.filter((task) => !task.completed)
    : filter === "completed"
    ? tasks.filter((task) => task.completed)
    : tasks

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
  />
)}
{filteredTasks.length === 0 && (
  <p id="filter-empty-message">
    No tasks match this filter
  </p>
)}
     <TaskList tasks={tasks}  onToggle={handleToggle} onDelete={onDelete} countText={`${tasks.length} Tasks`} />
    </>
  )
}




