import React from "react";

const Container = (props) => {
  return (
    <section className={props.classProp} id={props.select}>
      <div className="container-xxl">{props.children}</div>
    </section>
  );
};

export default Container;
