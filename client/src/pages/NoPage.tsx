import { FitScreen } from "@mui/icons-material";
import HalfFadeBg from "../components/HalfFadeBg";
import HomeHeader from "../components/HomeHeader";
import { useRef } from "react";
function NoPage() {
  const ref = useRef(null);
  return (
    <HalfFadeBg
      imageUrl="/images/bg-light.webp"
      className="justify-content-center align-items-center"
    >
      <div ref={ref}>
        <HomeHeader imageUrl="/images/logo-orange.webp" appName="Milage" />
      </div>
      <div
        className="container d-flex flex-wrap justify-content-center align-items-center"
        style={{ height: `calc(100vh - 80px)` }}
      >
        <h1
          className="col-12 display-1 text-center"
          style={{ fontWeight: "bold", color: "#F0F0F0" }}
        >
          404 - Page Not Found
        </h1>
        <a href="/app" className="w-100 btn btn-dark">
          return
        </a>
      </div>
    </HalfFadeBg>
  );
}

export default NoPage;
