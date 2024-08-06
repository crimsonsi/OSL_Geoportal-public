export default function ButtonMain(props) {
  return (
    <div className="button">
      <button
        onClick={() => {
          props.handleClick();
        }}
      >
        {props.label}
      </button>
    </div>
  );
}
