import type {ReactNode} from 'react'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
   variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  id?: string
}

export default function Button({ 
children, onClick, type = 'button', variant = 'primary', disabled = false, id
}: ButtonProps) {

const background = {
    primary: "#2563eb",
    secondary: "#6b7280",
    danger: "#dc2626",
  };

  return (
 <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "8px 14px",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: background[variant],
      }}
    >
      {children}
    </button>
  )
}
