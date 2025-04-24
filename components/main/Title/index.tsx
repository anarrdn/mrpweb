interface TitleProps {
  bold: string;
  light: string;
  type?: "h2" | "h3" | "h4" | "h5" | "h6";
}

const Title = ({ bold, light, type }: TitleProps) => {
  const HeadingTag = type || "p";

  return (
    <HeadingTag className="text-gray-800 font-bold text-3xl lg:text-5xl">
      {bold}
      <span className="text-gray-500"> {light}</span>
    </HeadingTag>
  );
};

export default Title;
