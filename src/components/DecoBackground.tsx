import { CSSProperties, ReactNode } from "react";

interface Props {
  imageUrl: string;
  children?: ReactNode;
}

function DecoBackground({ imageUrl, children }: Props) {
  const bgStyle: CSSProperties = {
    position: "relative",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  };
  const filterStyle: CSSProperties = {
    backgroundColor: "#202f3a77",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div style={bgStyle}>
        <div style={filterStyle}> {children}</div>
      </div>
    </>
  );
}

export default DecoBackground;
