import MyError from "../../Utils/MyError";

const Item = (props) => {
  return (
    <div className="exp">
      <b>
        <p>{props.label}</p>
      </b>
      <p>{props.txt}</p>
    </div>
  );
};

export default function Metadata(props) {
  return (
    <div className="s_panel">
      <h4>Metadata</h4>
      <hr />

      {props.body ? (
        <>
          <Item label="Name of Dataset" txt={props.body?.Dataset} />
          <Item label="Theme" txt={props.body?.Category} />
          <Item label="Data Owner" txt={props.body?.Owner} />
          <Item label="Keywords" txt={props.body.Keywords} />
          <Item label="Data Type" txt={props.body?.Type} />
        </>
      ) : (
        <MyError txt="Please load some data first!!!" />
      )}
    </div>
  );
}
