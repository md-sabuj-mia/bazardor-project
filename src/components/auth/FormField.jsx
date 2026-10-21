export default function FormField({ label, name, error, ...input }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`input w-full rounded-lg ${error ? "input-error" : ""}`}
        {...input}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}