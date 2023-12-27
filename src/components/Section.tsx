import { customProps } from "../Interfaces";
import { useTheme } from "../context/Theme";
import { mergeClasses } from "../utilies";
import Container from "./Container";

interface Props extends customProps {
  title?: string;
  icon?: React.ReactNode;
  onTitleClick?: () => void;
  hidden?: boolean;
}
const Section = (props: Props) => {
  const { theme } = useTheme();
  if (props.hidden) return <></>;
   
  return (
    <Container className={`${props.className} ${theme === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {props.title ? (
        <h2
          onClick={props.onTitleClick}
          className={mergeClasses(
            "text-4xl mobile:text-3xl px-4 py-2 my-4 border-b-4 border-primary",
            props.onTitleClick ? "cursor-pointer hover:text-primary" : ""
          )}
          dangerouslySetInnerHTML={{
            __html: props.title,
          }}
        ></h2>
      ) : (
        ""
      )}
      {props.children}
    </Container>
  );
};

export default Section;
