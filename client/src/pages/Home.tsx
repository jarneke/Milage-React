import { useScroll } from "framer-motion";
import HalfFadeBg from "../components/HalfFadeBg";
import HomeHeader from "../components/HomeHeader";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";

function Home() {
  document.title = "Milage | Home";
  return (
    <>
      <HalfFadeBg imageUrl="/images/bg-light.webp" />
      <HomeHeader
        imageUrl="/images/logo-orange.webp"
        appName="Milage"
        navItems={["home", "app", "login"]}
      />
      <Parallax />
      <div
        className="mt-5 container text-light d-flex flex-wrap"
        style={{ gap: "2rem" }}
      >
        <h1 style={{ marginTop: "5rem" }}>Welcome</h1>
        <p>
          Welcome to Milage, the ultimate app for sharing a car and tracking
          mileage among users! Whether you're part of a family or a group of
          friends, Milage makes it easy to keep track of how many kilometers
          each person drives and ensures that everyone pays their fair share.
        </p>
        <hr style={{ width: "100%" }} />
        <section className="features d-flex flex-wrap" style={{ gap: "1rem" }}>
          <h1>Features</h1>
          <article>
            <h2>Group management (Work in Progress)</h2>
            <p>
              With Milage, managing your group or family has never been easier.
              You can join existing groups or create new ones, ensuring seamless
              coordination among all members. Each group can have one or more
              shared cars, and Milage will accurately track the kilometers
              driven by each member, making it simple to monitor usage and share
              costs fairly.
            </p>
          </article>
          <article>
            <h2>Expense Calculation (Work in Progress)</h2>
            <p>
              Fair Payment Calculation: Milage will soon offer a feature to
              calculate how much each user has to pay based on the kilometers
              they have driven. Email Notifications: Every time the car's tank
              gets a refill, all users will receive an email detailing the
              amount they owe (feature still under development).
            </p>
          </article>
        </section>
        <hr style={{ width: "100%" }} />

        <h1>Join Milage Today!</h1>
        <p>
          Experience hassle-free car sharing with accurate mileage tracking. Log
          in or register now to get started!
        </p>
      </div>
      <div
        style={{
          height: "10rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          href="https://github.com/jarneke/Milage-React"
          style={{ color: "white", textDecoration: "none" }}
        >
          &copy; Github: jarneke
        </a>
      </div>
    </>
  );
}

export default Home;
