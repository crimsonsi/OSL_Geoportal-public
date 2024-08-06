import ImageUpload from "./ImageUpload";

export default function PreviewData(props) {
  return (
    <div className="desc">
      <h2>{props.body.Title}</h2>

      <div className="div2equal">
        <div>
          <div className="description">
            <p>{props.body.Description}</p>
          </div>

          <h4>
            <span>Dataset: </span>
            {props.body.Dataset}
          </h4>
          <h4>
            <span>Keywords: </span>
            {props.body.Keywords}
          </h4>
          <h4>
            <span>Collection: </span>
            {props.body.Collection ? props.body.Collection : `None`}
          </h4>
          <h4>
            <span>Owner: </span>
            {props.body.Owner}
          </h4>
          {props.body.SourceLink && <h4>
            <span>Link: </span>
            <a className="sourcelink" href={props.body.SourceLink} target="_blank">Go to Source</a>
          </h4>}
          <h4>
            <span>Date of Capture: </span>
            {props.body.AcquisitionDate ? props.body.AcquisitionDate : `N/A`}
          </h4>
          <h4>
            <span>Classification Type: </span>
            {props.body?.Data[0]?.style?.type} Classification
          </h4>
        </div>
        <ImageUpload
          preview={true}
          body={props.body}
          updateBody={props.updateBody}
        />
      </div>
    </div>
  );
}
