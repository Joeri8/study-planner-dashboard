type InputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "date";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

export default function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}
