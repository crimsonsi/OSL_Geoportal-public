import { useEffect, useRef, useState } from "react";

export default function Popup(props) {
  const [cols, setCols] = useState(null);
  const pp = useRef();

  useEffect(() => {
    if (props.data) {
   
      let d = props.data;
      delete d.geometry;
      const c = Object.keys(d);
      setCols(c);
    }
  }, [props.data]);

  return (
    <div ref={pp} className="popup">
      <div className="container">
        <i
          className="fa fa-times"
          onClick={() => {
            pp.current.classList.add(`zoom_out`);
            setTimeout(() => {
              props.setPopup(null);
            }, 1000);
          }}
        ></i>
        <h3>Feature Details</h3>
        {/* <hr /> */}
        <div className="div2equal">
          {cols &&
            cols.map((e) => {
              return (
                <p>
                  <b>{e.charAt(0).toUpperCase() + e.slice(1)}: </b>
                  {props.data[e]}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}
