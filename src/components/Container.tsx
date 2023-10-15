import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";
const Container = (props: customProps) => {
  return (
    <div
      className={mergeClasses(
        "py-4 max-w-screen-xl mx-auto px-10 xl:px-0",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
