import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";
interface Props extends customProps {
  src: string;
  
}
const Image = (props: Props) => {
  return (
    <div
      className={mergeClasses(
        "h-full w-full overflow-hidden",
        props.className
      )}
    >
      <LazyLoadImage
        alt={props.src}
        src={props.src}
        effect="blur"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Image;
