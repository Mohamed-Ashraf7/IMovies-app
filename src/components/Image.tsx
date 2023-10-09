import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";

interface Props extends customProps {
  src: string;
}
const Image = (props: Props) => {
  return (
    <div
      className={mergeClasses(
        "bg-primary h-full w-full overflow-hidden",
        props.className
      )}
    >
      <img
        alt={props.src}
        src={props.src}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Image;
