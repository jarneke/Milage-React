import { useState } from "react";
import HalfFadeBg from "../components/HalfFadeBg";
import HomeHeader from "../components/HomeHeader";
import LabelInput from "../components/LabelInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <HalfFadeBg imageUrl="/images/bg-light.webp">
      <HomeHeader
        imageUrl="/images/logo-orange.webp"
        appName="Milage"
        navItems={["home", "app"]}
      />
      <div className="mt-5 container">
        <div className="d-flex flex-wrap">
          <LabelInput
            className="col-12"
            label="Email"
            type="email"
            name="email"
            placeholder="Example@example.com"
            value=""
            onChange={() => {}}
          />
          <LabelInput
            className="col-12 mt-3"
            label="Password"
            type="password"
            name="password"
            placeholder="**********"
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="right"></div>
      </div>
    </HalfFadeBg>
  );
}

export default Login;
