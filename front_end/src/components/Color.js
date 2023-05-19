import React from "react";

const Color = ({ color, onClick }) => {
  return (
    <React.Fragment>
      <ul className="colors ps-0 mb-0">
        <li
          onClick={onClick}
          style={{ backgroundColor: color, border: "1px solid darkseagreen" }}
        ></li>
      </ul>
    </React.Fragment>
  );
};

export default Color;
