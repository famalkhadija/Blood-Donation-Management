import React from "react";

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <input
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-[80%] p-2 border border-gray-300 rounded`}
    />
  );
}