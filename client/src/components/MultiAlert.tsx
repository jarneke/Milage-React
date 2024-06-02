import WarningIcon from "@mui/icons-material/Warning";
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/joy/Alert";
interface props {
  show: boolean;
  type: "Error" | "Success" | "Info" | "Warning" | "";
  message: string;
}
function MultiAlert({ type, message, show }: props) {
  return (
    <>
      {show ? (
        type === "Error" ? (
          <Alert
            className="col-12"
            style={{
              backgroundColor: "#FF000055",
              color: "#F0F0F0",
            }}
            startDecorator={<WarningIcon />}
          >
            {message}
          </Alert>
        ) : type === "Success" ? (
          <Alert
            className="col-12"
            style={{
              backgroundColor: "#FF000055",
              color: "#F0F0F0",
            }}
            startDecorator={<CheckIcon />}
          >
            {message}
          </Alert>
        ) : (
          <Alert
            className="col-12"
            style={{
              backgroundColor: "#FF000055",
              color: "#F0F0F0",
            }}
            startDecorator={<InfoIcon />}
          >
            {message}
          </Alert>
        )
      ) : null}
    </>
  );
}

export default MultiAlert;
