import React from "react";
interface Props {
  HTMLFor: string;
  label: string;
}
function LabelFor({ HTMLFor, label }: Props) {
  return (
    <label htmlFor="{HTMLFor}" className="form-label text-light">
      {label}
    </label>
  );
}

export default LabelFor;
