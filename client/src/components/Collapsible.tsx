import { ReactNode, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/joy/Button";
interface Props {
  className?: string;
  children?: ReactNode;
  title: string;
}
function Collapsible({ className, children, title }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${className} p-2 rounded`}
      style={{
        backgroundColor: "#F0F0F055",
      }}
    >
      <Button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "1.5rem",
          padding: "0",
          width: "100%",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
        }}
        endDecorator={
          open ? (
            <KeyboardArrowUpIcon sx={{ color: "#FFFFFF" }} />
          ) : (
            <KeyboardArrowDownIcon />
          )
        }
      >
        {title}
      </Button>
      <div
        className=""
        style={{
          overflow: "hidden",
          maxHeight: open ? "500px" : "0",
          transition: "max-height 0.5s linear",
        }}
      >
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}

export default Collapsible;
