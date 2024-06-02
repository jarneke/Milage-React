import React from "react";
interface Props {
  label: string;
  href: string;
}
function MenuElem({ label, href }: Props) {
  return (
    <a
      href={href}
      className="btn btn-primary btn-lg w-100 border-0 fs-3"
      style={{ width: "100%", backgroundColor: "#FFA50055" }}
    >
      {label}
    </a>
  );
}

export default MenuElem;
