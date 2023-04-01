import React from "react";

const CustomInput = ({
  className = "form-control",
  type,
  name,
  placeholder,
  onBlur,
  onChange,
  value,
}) => {
  return (
    <div>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
