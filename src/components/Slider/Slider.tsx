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
      speed: 800,
      autoplay: true,
      autoplaySpeed: 3500,
      cssEase: "linear",
      pauseOnHover: true,
      infinite: true,
      swipe: true,
      slidesToShow: props.num,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
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
      {props.children ? props.children(onSwipe) : ""}
    </Slick>
  );
};
export default Slider;
