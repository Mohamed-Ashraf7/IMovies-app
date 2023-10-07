import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";
const Container = (props: customProps) => {
  return (
    <div
      className={mergeClasses(
        "px-14 py-4 max-w-screen-xl mx-auto",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
