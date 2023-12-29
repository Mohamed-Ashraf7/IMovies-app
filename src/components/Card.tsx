import { Fragment } from "react";
import Image from "./Image";
import { MdPlayCircleFilled } from "react-icons/md";
import { customProps } from "../Interfaces";
import { mergeClasses } from "./../utilies";
import { FaStar } from "react-icons/fa";
interface Props extends customProps {
  imageSrc: string;
  title?: string;
  vote?: number;
  release?: string;
  onClick?: Function;
  withPlay?: boolean;
}

const Card = (props: Props) => {
  const withPlay = props.withPlay ?? true;

  return (
    <Fragment>
       <div
        onClick={() => (props.onClick ? props.onClick() : " ")}
        className={mergeClasses(
          "group m-1.5  bg-transparent mobile:h-[290px] md:min-h-[306px] overflow-hidden cursor-pointer relative rounded-sm hover:border-b-4 hover:rounded-xl hover:border-primary transition duration-700",
          props.className)}>
          {withPlay ? (
          <div
            className="absolute hidden group-hover:flex items-center
             justify-center left-0 right-0 top-0 bottom-0
             before:absolute  before:content-['']  before:bg-black
             before:opacity-[0.7] before:left-0 before:right-0
             before:top-0 before:bottom-0 z-10" >
            <button aria-label="mediaPlayer" className="relative z-10">
              <MdPlayCircleFilled size={50}></MdPlayCircleFilled>
            </button>
          </div>
        ) : ("")}
        <Image src={props.imageSrc}></Image>
      </div>
      <p
        className="pt-1 shadow-md text-center uppercase mobile:text-sm">
        {props.title?.slice(0,20)}{" "}
      </p>
      <div className="flex items-center mt-1 justify-between flex-row px-5">
          <p className="text-start uppercase text-xs">{props.release}</p>
      {props.vote ? (
      <p className={`${parseFloat(props.vote?.toFixed(1) || "0") > 7 ? "bg-green-700 " : "bg-red-700"} p-1  rounded-md text-md gap-x-[2px] flex items-center mobile:text-xs`}>
        {props.vote?.toFixed(1)}
       <FaStar />
      </p>
       ) : ("")}

        {props.children}
      </div>
    </Fragment>
  );
};

export default Card;
