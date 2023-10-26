import Image from "./Image";
import { MdPlayCircleFilled } from "react-icons/md";
import { customProps } from "../Interfaces";
import { mergeClasses } from "./../utilies";
import { FaStar } from "react-icons/fa";
interface Props extends customProps {
  imageSrc: string;
  title?: string;
  vote?: number;
  time?: number;
  onClick?: Function;
  withPlay?: boolean;
}

const Card = (props: Props) => {
  const withPlay = props.withPlay ?? true;

  return (
    <>
      <div
        onClick={() => (props.onClick ? props.onClick() : " ")}
        className={mergeClasses(
          "group mx-1 my-1.5 cursor-pointer h-[350px] mobile:h-[310px] relative  rounded-md overflow-hidden hover:p-0hover:scale-105 hover:border-b-4 hover:rounded-xl hover:border-primary hover:transition duration-900",
          props.className)}>
        {withPlay ? (
          <div
            className=" absolute hidden group-hover:flex items-center
             justify-center left-0 right-0 top-0 bottom-0
             before:absolute  before:content-['']  before:bg-black
              before:opacity-[0.7] before:left-0 before:right-0
            before:top-0 before:bottom-0" >
            <button className="relative z-10">
              <MdPlayCircleFilled size={50}></MdPlayCircleFilled>
            </button>
          </div>
        ) : ("")}
        <Image src={props.imageSrc}></Image>
      </div>
      <p
        className="py-2 line-clamp-2   
          shadow-md text-center uppercase">
        {props.title}{" "}
      </p>
      <div className="flex items-center justify-between flex-row">
        {typeof props.time === "number" ? (
          <p className="text-start uppercase">{props.time}min</p>
        ) : (
          <p className="text-start uppercase">N/A</p>
        )}
        <p className="px-3 py-1 rounded-md text-lg text-center gap-x-[2px] flex items-center  text-orange-400  mx-1">
          {props.vote}
          <FaStar className="text-orange-400 text-center " />
        </p>
        {props.children}
      </div>
    </>
  );
};

export default Card;
