import React, { forwardRef } from "react";

interface FormInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      value,
      onChange,
      label,
      placeholder,
      error,
      type = "text",
    },
    ref
  ) => {
    return (
      <>
        <label htmlFor={id}>{label}</label>

        <input
          ref={ref}
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
);

FormInput.displayName = "FormInput";

export default FormInput;