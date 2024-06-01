import HalfFadeBg from "../components/HalfFadeBg";
import HomeHeader from "../components/HomeHeader";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <HalfFadeBg imageUrl="/images/bg-light.webp">
      <HomeHeader
        imageUrl="/images/logo-orange.webp"
        appName="Milage"
        navItems={["home", "app"]}
      />
      <div className="mt-5 container">
        <div className="d-flex flex-wrap gap-3">
          <LoginForm />
        </div>
        <div className="right"></div>
      </div>
    </HalfFadeBg>
  );
}

export default Login;
