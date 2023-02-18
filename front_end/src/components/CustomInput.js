import React from "react";

const CustomInput = ({
  className = "form-control",
  type,
  name,
  placeholder,
}) => {
  return (
    <div>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
