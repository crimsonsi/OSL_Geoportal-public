export default function Options(props) {
  return (
    <div className="model">
      <div className="container">
        <h3>Select Instance Type</h3>
        <h4
          onClick={() => {
            props.setType("Thematic Map");
          }}
        >
          <i className="fa fa-map"></i> Thematic Maps
        </h4>
        <h4
          onClick={() => {
            props.setType("Topo Map");
          }}
        >
          <i className="fa fa-map"></i>Topographic Maps
        </h4>
        <h4
          onClick={() => {
            props.setType("Cadastral Map");
          }}
        >
          <i className="fa fa-map"></i>Cadastral Maps
        </h4>
        <h4
          onClick={() => {
            props.setType("Basemap");
          }}
        >
          <i className="fa fa-map"></i>Basemap / Imagery
        </h4>
        <h4
          onClick={() => {
            props.setType("World Data");
          }}
        >
          <i className="fa fa-map"></i>World Data
        </h4>
      </div>
    </div>
  );
}
