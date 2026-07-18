import TaskCard from "./TaskCard"

export interface Task {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category: string
  tags: string[]
}

interface TaskListProps {
  tasks?: Task[]
  countText?: string,
    onToggle?: (id: string | number) => void,
    onDelete?: (id: string | number) => void,
  editingId?: string | number | null
  setEditingId?: (id: string | number | null) => void
  onUpdateTask?: (id: string | number, updates: {title: string
    description: string
    priority: string}) => void
}

const HARDCODED_TASKS: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First hardcoded task",
    priority: "High",
    completed: false,
    category: "General",
    tags: [],
  },
  {
    id: 2,
    title: "Task Two",
    description: "Second hardcoded task",
    priority: "Medium",
    completed: false,
    category: "General",
    tags: [],
  },
  {
    id: 3,
    title: "Task Three",
    description: "Third hardcoded task",
    priority: "Low",
    completed: false,
    category: "General",
    tags: [],
  },
]

export default function TaskList({
  tasks,
    countText,
  onToggle,
  onDelete,
  editingId,
  setEditingId,
  onUpdateTask,
}: TaskListProps) {
  const tasksList = tasks ?? HARDCODED_TASKS

const completedCount =  tasksList.filter(task => task.completed).length

  return (
    <section id="task-list">
       <p id="task-count">
        {countText ??
          `${completedCount} of ${tasksList.length} completed`}
      </p>
      {tasksList.map((task) => (
        <TaskCard
          key={task.id}
          taskId={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          isEditing={editingId === task.id}
          setEditingId={setEditingId}
          onUpdateTask={onUpdateTask}
          category={task.category}
          tags={task.tags}
        />
      ))}
    </section>
  )
}
        