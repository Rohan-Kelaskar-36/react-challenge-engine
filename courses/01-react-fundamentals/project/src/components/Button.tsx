// import type {ReactNode} from 'react'
import { useTheme } from "../contexts/ThemeContext";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
   variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  id?: string
}

export default function Button({ 
children, onClick, type = 'button', variant = 'primary', disabled = false, id,...rest
}: ButtonProps) {

  const { theme } = useTheme();

const background = {
    primary: "#3f444d",
    secondary: "#6b7280",
    danger: "#dc2626",
  };



  return (
 <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
      style={{
        padding: "8px 14px",
        color: "#fff",
        border:
theme==="dark"
? "1px solid white"
: "none",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: background[variant],
      }}
    >
      {children}
    </button>
  )
}
