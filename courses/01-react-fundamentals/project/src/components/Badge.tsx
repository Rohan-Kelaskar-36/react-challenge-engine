interface BadgeProps {
  children?: React.ReactNode
  variant?: "priority" | "category" | "tag";
}

export default function Badge({
  children,
  variant = 'tag',
}: BadgeProps) {

  const colors = {
    priority: "#fee2e2",
    category: "#dbeafe",
    tag: "#e5e7eb",
  };
  return(
     <span
      style={{
        display: "inline-block",
        padding: "4px 8px",
        marginRight: "6px",
        borderRadius: "12px",
        backgroundColor: colors[variant],
        fontSize: "12px",
      }}
    >
      {children}
    </span>
  )
}
