import { IconButton } from "@mui/joy";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../../../api/types";
import MenuElem from "./MenuElem";
import React, { ReactNode } from "react";

interface Props {
  className?: string | undefined;
  imageUrl: string;
  appName: string;
  navItems?: string[];
  user?: User;
}
function AppHeader({ className, imageUrl, appName, user }: Props) {
  const headerClasses: string =
    "d-flex justify-content-between align-items-center p-2";
  if (!user) {
    console.log(user);

    /*window.location.href = "/home";*/
  }
  return (
    <>
      <header className={className ? className + headerClasses : headerClasses}>
        <div className="d-flex align-items-center col-4">
          <img className="col-2" src={imageUrl} alt={appName + "logo"} />
          <h1
            className="display-4"
            style={{ color: "#F0F0F0", fontWeight: "bold" }}
          >
            {appName}
            <span style={{ color: "#FFA500" }}>.</span>
          </h1>
        </div>
        <div>
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
          className="offcanvas-header"
          style={{
            backgroundColor: "#21303b",
          }}
        >
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
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
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
            <CloseIcon />
          </IconButton>
        </div>
        <div
          className="offcanvas-body"
          style={{ backgroundColor: "#21303b99" }}
        >
          <MenuElem label="Home" href="/home" />
        </div>
      </div>
    </>
  );
}

export default AppHeader;
