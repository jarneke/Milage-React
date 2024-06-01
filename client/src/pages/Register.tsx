import HalfFadeBg from "../components/HalfFadeBg";
import HomeHeader from "../components/HomeHeader";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <>
      <HalfFadeBg imageUrl="/images/bg-light.webp">
        <HomeHeader
          imageUrl="/images/logo-orange.webp"
          appName="Milage"
          navItems={["home", "app"]}
        />
        <div className="mt-5 container">
          <div className="d-flex flex-wrap gap-3">
            <RegisterForm />
          </div>
          <div className="right"></div>
        </div>
      </HalfFadeBg>
    </>
  );
}

export default Register;
