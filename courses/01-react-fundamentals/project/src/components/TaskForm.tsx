import { useState } from "react"

export interface NewTask {
  id: string | number
  title: string
  description: string
  priority: string
  completed: boolean
  category: string
tags: string[],
dueDate?: string
}

interface TaskFormProps {
  onAddTask?: (task: NewTask) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Low")
  const [error, setError] = useState("")
const [category, setCategory] = useState("General")
const [tags, setTags] = useState("")
const [dueDate, setDueDate] = useState("")


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setError("")

    onAddTask?.({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      category,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
      dueDate: dueDate || undefined
    })

    setTitle("")
    setDescription("")
    setPriority("Low")
    setCategory("General")
setTags("")
setDueDate("")
  }

  return (
    <form
  onSubmit={handleSubmit}
  style={{
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
  }}
>
  <label htmlFor="task-title">Title</label>
  <input
    id="task-title"
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    }}
  />

<label htmlFor="task-description">Description</label>
  <textarea id="task-description"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      resize: "vertical",
    }}
  />

<label htmlFor="task-priority">Priority</label>
  <select 
id="task-priority"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    }}
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>

  <label>Category</label>

<select
style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    }}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option>General</option>
  <option>Work</option>
  <option>Personal</option>
</select>

<label>Tags</label>

<input
  type="text"
  placeholder="tag1, tag2, tag3"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
/>
<label>Due Date</label>

<input
  id="task-due-date-input"
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
/>

  <button
    type="submit"
    style={{
      padding: "10px",
      backgroundColor: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    Add Task
  </button>

  {error && (
    <p
      id="task-form-error"
      style={{
        color: "red",
        margin: 0,
        fontSize: "14px",
      }}
    >
      {error}
    </p>
  )}
</form>
  )
}