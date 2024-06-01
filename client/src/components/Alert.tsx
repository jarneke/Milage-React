import React from "react";
interface props {
  type: "Error" | "Success" | "Info" | "Warning" | "";
  message: string;
  onClose: () => void;
}
function Alert({ type, message, onClose }: props) {
  let alertClasses = "alert alert-dismissible fade show";
  switch (type) {
    case "Error":
      alertClasses += " alert-danger";
      break;
    case "Success":
      alertClasses += " alert-success";
      break;
    case "Info":
      alertClasses += " alert-info";
      break;
    case "Warning":
      alertClasses += " alert-warning";
      break;
    default:
      break;
  }
  return (
    <div className={alertClasses} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Alert;
