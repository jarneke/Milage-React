import { Button, IconButton, Tooltip } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RouteIcon from "@mui/icons-material/Route";
import MenuElem from "./MenuElem";
import { useEffect } from "react";

interface Props {
  className?: string | undefined;
  imageUrl: string;
  appName: string;
  navItems?: string[];
}
function AppHeader({ className, imageUrl, appName, navItems }: Props) {
  const headerClasses: string =
    "d-flex justify-content-between align-items-center p-2";
  const navElems = navItems?.map((item, index) => (
    <MenuElem
      key={index}
      label={item}
      href={"/app/" + item.replaceAll(" ", "-")}
    />
  ));
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      const exp = JSON.parse(decoded).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        console.log("token expired");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }, []);
  return (
    <>
      <header className={className ? className + headerClasses : headerClasses}>
        <a
          href="/app"
          className="d-flex align-items-center col-4 text-decoration-none"
        >
          <img className="col-2" src={imageUrl} alt={appName + "logo"} />
          <h1
            className="display-4"
            style={{ color: "#F0F0F0", fontWeight: "bold" }}
          >
            {appName}
            <span style={{ color: "#FFA500" }}>.</span>
          </h1>
        </a>
        <div
          className="d-none d-md-grid"
          style={{
            display: "grid",
            gap: "15px",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          <Tooltip title="Dashboard">
            <IconButton
              onClick={() => (window.location.href = "/app")}
              type="button"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#21303b",
                border: "2px solid #FFFFFF",
              }}
            >
              <AppsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="My Cars">
            <IconButton
              onClick={() => (window.location.href = "/app/cars")}
              type="button"
              style={{
                position: "relative",
                color: "#FFFFFF",
                backgroundColor: "#21303b",
                border: "2px solid #FFFFFF",
              }}
            >
              <DirectionsCarIcon
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translate(-2px, 2px)",
                }}
              />
              <DirectionsCarIcon
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) translate(2px, -2px)",
                  color: "#FFFFFF99",
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="My Trips">
            <IconButton
              onClick={() => (window.location.href = "/app/trips")}
              type="button"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#21303b",
                border: "2px solid #FFFFFF",
              }}
            >
              <RouteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              onClick={() => (window.location.href = "/app/profile")}
              type="button"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#21303b",
                border: "2px solid #FFFFFF",
              }}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout" style={{ backgroundColor: "#FF4D4D" }}>
            <IconButton
              sx={{
                "--IconButton-size": "50px",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              type="button"
              style={{
                color: "#FF4D4D",
                backgroundColor: "#21303b",
                border: "2px solid #FF4D4D",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="justify-content-between align-items-center d-flex d-md-none">
          <Tooltip title="Menu">
            <IconButton
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              className="me-2"
              variant="outlined"
              style={{
                backgroundColor: "#F0F0F055",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </div>
      </header>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="offcanvas-header d-flex flex-column justify-content-start align-items-center"
          style={{
            backgroundColor: "#21303b",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center col-4">
              <img className="col-5" src={imageUrl} alt={appName + "logo"} />
              <h1
                className="display-4"
                style={{ color: "#F0F0F0", fontWeight: "bold" }}
              >
                {appName}
                <span style={{ color: "#FFA500" }}>.</span>
              </h1>
            </div>
            <IconButton
              type="button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              className="me-2 btn-close"
              variant="outlined"
              style={{
                backgroundColor: "#F0F0F055",
              }}
            >
              <CloseIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
          </div>
        </div>
        <div
          className="offcanvas-body d-flex flex-column gap-2"
          style={{ backgroundColor: "#21303b99" }}
        >
          <Button
            className="justify-content-start ps-5"
            onClick={() => (window.location.href = "/app")}
            type="button"
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              backgroundColor: "#21303b",
              border: "2px solid #FFFFFF",
            }}
            startDecorator={
              <AppsIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            }
          >
            {" "}
            Dashboard
          </Button>
          <Button
            className="justify-content-start ps-5"
            onClick={() => (window.location.href = "/app/cars")}
            type="button"
            style={{
              fontSize: "2rem",
              position: "relative",
              color: "#FFFFFF",
              backgroundColor: "#21303b",
              border: "2px solid #FFFFFF",
            }}
            startDecorator={
              <>
                <DirectionsCarIcon
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%) translate(-2px, 2px)",
                  }}
                />
                <DirectionsCarIcon
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%) translate(2px, -2px)",
                    color: "#FFFFFF99",
                  }}
                />
              </>
            }
          >
            {" "}
            Cars
          </Button>
          <Button
            className="justify-content-start ps-5"
            onClick={() => (window.location.href = "/app/trips")}
            type="button"
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              position: "relative",
              backgroundColor: "#21303b",
              border: "2px solid #FFFFFF",
            }}
            startDecorator={
              <RouteIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            }
          >
            {" "}
            Trips
          </Button>
          <Button
            className="justify-content-start ps-5"
            onClick={() => (window.location.href = "/app/profile")}
            type="button"
            style={{
              fontSize: "2rem",
              color: "#FFFFFF",
              backgroundColor: "#21303b",
              border: "2px solid #FFFFFF",
            }}
            startDecorator={
              <PersonIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            }
          >
            {" "}
            Profile
          </Button>
          <Button
            className="justify-content-start ps-5"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            type="button"
            style={{
              fontSize: "2rem",
              color: "#FF4D4D",
              backgroundColor: "#21303b",
              border: "2px solid #FF4D4D",
            }}
            startDecorator={
              <LogoutIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            }
          >
            {" "}
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
