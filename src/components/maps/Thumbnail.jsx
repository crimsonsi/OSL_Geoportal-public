export default function Thumbnail(props) {
  
  return (
    <div
      onClick={() => {
        window.location.href = `/maps/${props.item.Category}/${props.item.ID}`;
      }}
      
      className="thumbnail"
    >
      <img src={"/api/" + props.item.Thumbnail} alt="" />
      <div className="desc">
        <h4>{props.item.Title}</h4>
        <p>{props.item.updatedAt.split("T")[0]}</p>
      </div>
    </div>
  );
}
