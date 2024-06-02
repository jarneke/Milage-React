import React, { useEffect } from "react";
import HalfFadeBg from "../components/HalfFadeBg";
import AppHeader from "../components/AppHeader";
import { User } from "../../../api/types";

function AppPage() {
  const [user, setUser] = React.useState<User>();
  document.title = "Milage | App";

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/users/loggedIn", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        window.location.href = "/login";
      }
      const data = await response.json();
      setUser(data);
    };

    if (!user) {
      fetchUser().catch((error) => {
        console.error(error);
        throw error;
      });
    }

    console.log(user);
  }, [user]);

  return (
    <>
      <HalfFadeBg imageUrl="/images/bg-light.webp" />
      <AppHeader
        imageUrl="/images/logo-orange.webp"
        appName="Milage"
        user={user}
      />
    </>
  );
}

export default AppPage;
