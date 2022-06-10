import MyPie from "./Others/MyPie";

export default function Charts(props) {


  return (
    <div className="items">
      <h3>Charts</h3>
      <p>
        Thematic Services facilitate the users to select, browse and query the
        Thematic Datasets from this portal.
      </p>
      <MyPie body={props.body} />
    </div>
  );
}
