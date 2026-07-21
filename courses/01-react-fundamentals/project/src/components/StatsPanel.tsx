import type {Task} from "./TaskList"


interface StatsPanelProps {
  total?: number
  completed?: number
  active?: number
  overdue?: number
  completionPercentage?: number
    categoryBreakdown: Record<string, number>;
  priorityBreakdown: Record<string, number>;
}

export default function StatsPanel({
  total=0,
  completed=0,
  active=0,
  overdue=0,
  completionPercentage=0,
  categoryBreakdown={},
  priorityBreakdown={},  
}: StatsPanelProps) {
  return (
   <section
      id="stats-panel"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      <h2>Task Statistics</h2>

      <p>Total: {total}</p>
      <p>
        Completed: {completed}
      </p>
      <p>Completion: {completionPercentage}%</p>
      <p>Active: {active}</p>
      <p>Overdue: {overdue}</p>

      <div
        role="progressbar"
        aria-valuenow={completionPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: "100%",
          height: "18px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: `${completionPercentage}%`,
            height: "100%",
            background: "#4caf50",
          }}
        />
      </div>

      <h3>Categories</h3>

      {Object.entries(categoryBreakdown).map(([category, count]) => (
        <p key={category}>
          {category}: {count}
        </p>
      ))}

      <h3>Priority</h3>

      {Object.entries(priorityBreakdown).map(([priority, count]) => (
        <p key={priority}>
          {priority}: {count}
        </p>
      ))}
    </section> 
  )
}
