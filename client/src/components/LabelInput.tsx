import { Input } from "@mui/joy";
import React, { InputHTMLAttributes, useState } from "react";

interface Props {
  className?: string | undefined;
  label: string;
  placeholder?: string | undefined;
  type: string;
  name: string;
  value: string;
}
function LabelInput({ className, label, placeholder, type, name }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className={className}>
      <label htmlFor={name} className="form-label" style={{ color: "#F0F0F0" }}>
        {label}
      </label>
      <Input
        placeholder={placeholder}
        size="lg"
        sx={{
          "&::before": {
            border: "3px solid #FFA500",
            transform: "scaleX(0)",
            left: "5",
            right: "5",
            bottom: 0,
            top: "unset",
            transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
            borderRadius: 0,
            borderBottomLeftRadius: "40px 20px",
            borderBottomRightRadius: "40px 20px",
          },
          "&:focus-within::before": {
            transform: "scaleX(1)",
          },
        }}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}

export default LabelInput;
