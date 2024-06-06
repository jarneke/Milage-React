import React from "react";
interface Props {
  label: string;
  href: string;
}
function MenuElem({ label, href }: Props) {
  return (
    <a
      href={href}
      className="w-100 text-decoration-none text-light fs-3 p-2 rounded"
      style={{ width: "100%", backgroundColor: "#21303bBB" }}
    >
      {label}
    </a>
  );
}

export default MenuElem;
