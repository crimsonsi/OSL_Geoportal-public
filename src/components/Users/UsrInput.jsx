import React, { forwardRef } from "react";

const UsrInput = (props, ref) => {
  return (
    <div className="usr_input">
      <label htmlFor="input">{props.label}</label>
      
      <input
        autoComplete="none"
        ref={ref}
        type={props.type}
        placeholder={props.placeholder}
        maxLength="50"
      />
      {props.icon && <i className={"fa " + props.icon}></i>}
    </div>
  );
};

export default forwardRef(UsrInput);
