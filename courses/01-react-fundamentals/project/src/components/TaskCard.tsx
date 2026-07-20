import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";
import StatusIndicator from "./StatusIndicator";
import { useTheme } from "../contexts/ThemeContext";

interface TaskCardProps {
  id?: string | number;
  taskId?: string | number;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
  onToggle?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  isEditing?: boolean;
  setEditingId?: (id: string | number | null) => void;
  onUpdateTask?: (
    id: string | number,
    updates: { title: string; description: string; priority: string },
  ) => void;
  category?: string;
  tags?: string[];
  dueDate?: string;
}

export default function TaskCard({
  id,
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
  category,
  tags = [],
  dueDate,
}: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState(priority);
  const [error, setError] = useState("");

  const { theme } = useTheme();

  const currentId = taskId ?? id;
  const handleSave = () => {
    if (!editTitle.trim()) {
      setError("Title is required");
      return;
    }

    onUpdateTask?.(currentId!, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setError("");
    setEditingId?.(null);
  };


  const today = new Date()
today.setHours(0, 0, 0, 0)

const due = dueDate ? new Date(dueDate) : null

if (due) {
  due.setHours(0, 0, 0, 0)
}

const diffDays =
  due
    ? Math.ceil(
        (due.getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null

const isOverdue =
  !!due &&
  !completed &&
  diffDays! < 0

const isDueToday =
  diffDays === 0

const isDueSoon =
  diffDays !== null &&
  diffDays > 0 &&
  diffDays <= 3
  return (
    <article data-overdue={isOverdue}
      id="task-card"
      data-completed={completed}
      style={{
       border: isOverdue
      ? "2px solid red"
      : "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
backgroundColor:
completed
? "#e8f5e9"
: theme === "dark"
? "#333"
: "#fff",

color:
theme === "dark"
? "#fff"
: "#111",      }}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            onToggle?.(currentId!);
          }}
        />
      )}
      {onDelete && (
  <Button
    type="button"
    variant="danger"
    onClick={() => {
      if (window.confirm("Are you sure?")) {
        onDelete(currentId!);
      }
    }}
  >
    Delete
  </Button>
)}
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

          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="primary" type="button" onClick={handleSave}>
              Save
            </Button>

            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2
            style={{
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {description}
          </p>

          <Badge variant="priority"> Priority: {priority}</Badge>

          <Badge variant="category">
            Category: {category}
          </Badge>

          <div id="task-tags">
            {tags.map((tag) => (
              <Badge
              variant="tag"
                key={tag}
                // style={{
                //   display: "inline-block",
                //   padding: "3px 8px",
                //   marginRight: "6px",
                //   borderRadius: "12px",
                //   background: "#e5e7eb",
                //   fontSize: "12px",
                // }}
              >
                {tag}
              </Badge>
            ))}
            {dueDate && (
  <p id="task-due-date">
    Due: {new Date(dueDate).toLocaleDateString()}
  </p>
)}
{isOverdue && (
  <StatusIndicator status="overdue" />  
)}

{isDueToday && (
  <StatusIndicator status="due-today" />
)}

{isDueSoon && (
  <StatusIndicator status="due-soon" />
)}
          </div>

          {onUpdateTask && (
            <Button onClick={() => setEditingId?.(currentId!)} variant="secondary">
              Edit
            </Button>
          )}
        </>
      )}
    </article>
  );
}
