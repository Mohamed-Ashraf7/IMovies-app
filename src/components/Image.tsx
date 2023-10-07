import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      <LazyLoadImage
        alt=""
        src={props.src}
        className="w-full h-full object-cover"
      ></LazyLoadImage>
    </div>
  );
};

export default Image;
