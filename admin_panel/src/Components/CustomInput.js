import React from "react";

const CustomInput = ({
  id,
  label,
  type,
  value,
  onChange,
  className = "form-control",
  placeholder,
  name,
  onBlur,
  maxLength,
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={className}
        value={value}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        maxLength={maxLength}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
