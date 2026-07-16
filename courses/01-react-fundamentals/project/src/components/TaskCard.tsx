import {useState} from "react"

interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
  onDelete?: (id: string | number) => void
  isEditing?: boolean
  setEditingId?: (id: string | number | null) => void
  onUpdateTask?: (id: string | number, updates: { title: string; description: string; priority: string }) => void
}

export default function TaskCard({
  title,
  description,
  priority,
  completed = false,
  onToggle,
  taskId,
  onDelete,
  isEditing,
  setEditingId,
  onUpdateTask,
}: TaskCardProps) {

  const [editTitle, setEditTitle] = useState(title)
const [editDescription, setEditDescription] = useState(description)
const [editPriority, setEditPriority] = useState(priority)
const [error, setError] = useState("");


const handleSave = () => {
  if (!editTitle.trim()) {
    setError("Title is required")
    return
  }

  onUpdateTask?.(taskId!, {
    title: editTitle,
    description: editDescription,
    priority: editPriority,
  })
}

const handleCancel = () => {
  setEditTitle(title)
  setEditDescription(description)
  setEditPriority(priority)
  setError("")
  setEditingId?.(null)
}

  return (
    <article id="task-card" data-completed={completed} style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
        marginBottom: "12px",
      backgroundColor: completed ? "#e8f5e9" : "#ffffff",
    }}>
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
  onToggle?.(taskId!)
}}
        />
      )}
{onDelete && ( 
  <button 
  type="button" 
onClick={() => { 
  if (window.confirm("Are you sure?") )
 { onDelete(taskId!)
  } 
  }} 
  style={{ marginLeft: "10px", padding: "4px 10px", cursor: "pointer", }} > Delete </button> )}
      {isEditing ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "12px",
    }}
  >
    <input
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      style={{
        padding: "8px",
        fontSize: "16px",
      }}
    />

    <textarea
      value={editDescription}
      onChange={(e) => setEditDescription(e.target.value)}
      rows={4}
      style={{
        padding: "8px",
        fontSize: "16px",
        resize: "vertical",
      }}
    />

    <select
      value={editPriority}
      onChange={(e) => setEditPriority(e.target.value)}
      style={{
        padding: "8px",
        width: "180px",
      }}
    >
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>

    {error && (
      <p style={{ color: "red", margin: 0 }}>
        {error}
      </p>
    )}

    <div style={{ display: "flex", gap: "10px" }}>
      <button type="button" onClick={handleSave}>
        Save
      </button>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  </div>
) : (

  <>
    <h2
      style={{
        textDecoration: completed
          ? "line-through"
          : "none",
      }}
    >
      {title}
    </h2>

    <p
      style={{
        textDecoration: completed
          ? "line-through"
          : "none",
      }}
    >
      {description}
    </p>

    <p>Priority: {priority}</p>

    {onUpdateTask && (
      <button
        onClick={() => setEditingId?.(taskId!)}
      >
        Edit
      </button>
    )}
  </>
)}
    </article>
  )
}