interface StatusIndicatorProps {
  status?:  | "overdue"
    | "due-today"
    | "due-soon"
    | "completed"
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
   const labels = {
    overdue: "Overdue",
    "due-today": "Due Today",
    "due-soon": "Due Soon",
    completed: "Completed",
  };

  return (
    <span
      style={{
        color:
          status === "overdue"
            ? "red"
            : "green",
        fontWeight: "bold",
        marginRight: "8px",
      }}
    >
      {labels[status]}
    </span>
  );
}
