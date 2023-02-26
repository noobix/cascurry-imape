import React from "react";

const CustomInput = ({
  id,
  label,
  type,
  value,
  onChange,
  className = "form-control",
  placeholder,
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
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomInput;
