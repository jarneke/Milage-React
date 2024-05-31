import { CSSProperties, ReactNode } from "react";

interface Props {
  imageUrl: string;
  children?: ReactNode;
  className?: string | undefined;
}

function HalfFadeBg({ imageUrl, children, className }: Props) {
  const bgStyle: CSSProperties = {
    position: "relative",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  };
  const filterStyle: CSSProperties = {
    background: `linear-gradient(to right, #202f3afa 55%, transparent 200%)`,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div style={bgStyle}>
        <div style={filterStyle}>
          <div className={className && className}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default HalfFadeBg;
