import placeholder from "../../assets/imgs/placeholder.png";
import { useEffect, useRef, useState } from "react";

export default function ImageUpload(props) {
  const file = useRef();
  const preview = useRef();
  const [image, setImage] = useState(placeholder);

  useEffect(() => {
    if (props.body.Thumbnail !== "") {
      if (typeof props.body.Thumbnail !== "object") {
        setImage("/api/" + props.body.Thumbnail);
      }
    }
  }, [props.body.Thumbnail]);

  return (
    <div className="photo">
      <div className="img">
        <img
          style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
          ref={preview}
          src={image}
          alt=""
        />
      </div>
    </div>
  );
}
