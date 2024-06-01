import React from "react";

interface Props {
  className?: string | undefined;
  imageUrl: string;
  appName: string;
  navItems?: string[];
}
function AppHeader({ className, imageUrl, appName, navItems }: Props) {
  const headerClasses: string = "d-flex justify-content-between p-2";
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
        {navItems && (
          <ul
            className="nav gap-3 align-items-center Display-5 flex-grow-1 justify-content-end me-5"
            style={{ color: "#F0F0F099", fontWeight: "bold" }}
          >
            {navItems.map((item, index) => (
              <div key={index} className="d-flex gap-3">
                <li onClick={() => (window.location.href = item)}>
                  {item.toUpperCase()}
                </li>
                {index < navItems.length - 1 ? <div>|</div> : ""}
              </div>
            ))}
          </ul>
        )}
      </header>
    </>
  );
}

export default AppHeader;
