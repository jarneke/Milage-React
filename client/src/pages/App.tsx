import HalfFadeBg from "../components/HalfFadeBg";
import AppHeader from "../components/AppHeader";
import Collapsible from "../components/Collapsible";
import RegisterTripForm from "../components/RegisterTripForm";

function AppPage() {
  document.title = "Milage | App";

  return (
    <>
      <HalfFadeBg imageUrl="/images/bg-light.webp" />
      <AppHeader
        imageUrl="/images/logo-orange.webp"
        appName="Milage"
        navItems={[
          "home",
          "profile",
          "My Groups",
          "My Cars",
          "My Trips",
          "test",
        ]}
      />
      <section className="container col-12">
        <section className="row g-3">
          <div className="col-12 col-md-6 mb-1 mb-md-0">
            <Collapsible title="Register a trip">
              <RegisterTripForm />
            </Collapsible>
          </div>
          <div className="col-12 col-md-6">
            <Collapsible title="My Groups">
              <AppHeader
                imageUrl="/images/logo-orange.webp"
                appName="Milage"
                navItems={[
                  "home",
                  "profile",
                  "My Groups",
                  "My Cars",
                  "My Trips",
                  "test",
                ]}
              />
            </Collapsible>
          </div>
        </section>
      </section>
    </>
  );
}

export default AppPage;
