interface FormInputProps {
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string;
  type?: string;
  error?: string;
}

export default function FormInput({ id, value, onChange, label, placeholder, error,type="text" }: FormInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
}