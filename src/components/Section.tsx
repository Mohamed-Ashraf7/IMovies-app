import { customProps } from "../Interfaces";
import { mergeClasses } from "../utilies";
import Container from "./Container";

interface Props extends customProps {
  title?: string;
  icon?: React.ReactNode;
  onTitleClick?: () => void;
  hidden?: boolean;
}
const Section = (props: Props) => {
  if (props.hidden) return <></>;
  return (
    <Container className={props.className}>
      {props.title ? (
        <h1
          onClick={props.onTitleClick}
          className={mergeClasses(
            "text-4xl mobile:text-3xl px-2 py-2 my-4  border-b-4 border-primary ",
            props.onTitleClick ? "cursor-pointer hover:text-primary" : ""
          )}
          dangerouslySetInnerHTML={{
            __html: props.title,
          }}
        ></h1>
      ) : (
        ""
      )}
      {props.children}
    </Container>
  );
};

export default Section;
