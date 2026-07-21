import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  let tasks = [];

  try {
    tasks = JSON.parse(
      localStorage.getItem("task-app-tasks") || "[]"
    );
  } catch {
    tasks = [];
  }

  const task = tasks.find(
    (t: any) => String(t.id) === id
  );

  if (!task) {
    return (
      <div id="task-detail-page">
        <p>Task not found.</p>

        <button
          id="task-detail-back"
          onClick={() => navigate("/challenge/21-react-router")}
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>Priority: {task.priority}</p>

      {task.category && <p>Category: {task.category}</p>}

      {task.dueDate && <p>Due Date: {task.dueDate}</p>}

      <button
        id="task-detail-back"
        onClick={() => navigate("/challenge/21-react-router")}
      >
        Back to list
      </button>
    </div>
  );
}