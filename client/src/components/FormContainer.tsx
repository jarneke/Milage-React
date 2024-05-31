import { CSSProperties } from "react";

function FormContainer() {
  const containerStyle: CSSProperties = {
    backgroundColor: "#202f3aee",
    padding: "2rem",
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items_center h-100 py-5 px-2">
        <div
          className="p-2 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 rounded rounded-4"
          style={containerStyle}
        ></div>
      </div>
    </>
  );
}

export default FormContainer;
