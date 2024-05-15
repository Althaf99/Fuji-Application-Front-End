import { forwardRef } from "react";

const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <p>{props.text}</p>
    </div>
  );
});

export default ComponentToPrint;
