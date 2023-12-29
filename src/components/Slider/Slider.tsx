import "./Slider.css";

import { ReactNode, useState } from "react";
import Slick, { Settings } from "react-slick";

interface Props extends Omit<Settings, "children"> {
  isMovieCard?: boolean;
  isSeasonCard?: boolean;
  children?: (onSwipe: boolean) => ReactNode;
  num?: number;
}

export const Slider = (props: Props) => {
  let settings: Omit<Settings, "children"> = {
    ...props,
  };

  if (props.isMovieCard) {
    settings = {
      speed: 500,
      autoplay:false,
      cssEase: "linear",
      infinite: true,
      swipe: true,
      slidesToShow: props.num,
      slidesToScroll: 1,
       responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.65,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }
  const [onSwipe, setOnSwipe] = useState(false);
  return (
    <Slick
      {...settings}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
    >
      {props.children ? props.children(onSwipe) : null}
    </Slick>
  );
};
export default Slider;
