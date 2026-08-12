import {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = "",
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-base-content"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={[
          "input input-bordered w-full",
          error ? "input-error" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-error">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-1 text-xs text-base-content/50">
          {helperText}
        </p>
      )}
    </div>
  );
}