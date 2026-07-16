interface TaskCardProps {
  title: string
  description: string
  priority: string
  completed?: boolean
  onToggle?: (id: string | number) => void
  taskId?: string | number
  onDelete?: (id: string | number) => void
}

export default function TaskCard({
  title,
  description,
  priority,
  completed = false,
  onToggle,
  taskId,
  onDelete,
}: TaskCardProps) {
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
          onChange={() =>{ if (taskId !== undefined){ onToggle(taskId)}}}
        />
      )}
{onDelete && ( 
  <button 
  type="button" 
onClick={() => { 
  if ( taskId !== undefined && window.confirm("Are you sure?") )
 { onDelete(taskId)
  } 
  }} 
  style={{ marginLeft: "10px", padding: "4px 10px", cursor: "pointer", }} > Delete </button> )}
      <h2
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >{title}</h2>
       <p
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >{description}</p>
      <p>Priority: {priority}</p>
    </article>
  )
}