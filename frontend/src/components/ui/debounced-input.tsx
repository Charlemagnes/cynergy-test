import { useState, useEffect } from "react";
import { Input } from "./input";

export function DebouncedInput({
  value: initialValue,
  className,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <Input {...props} className={className} value={value} onChange={(e) => setValue(e.target.value)} />;
}
