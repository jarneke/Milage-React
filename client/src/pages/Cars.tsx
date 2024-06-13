import React, { useEffect, useState } from "react";
import HalfFadeBg from "../components/HalfFadeBg";
import AppHeader from "../components/AppHeader";
import Collapsible from "../components/Collapsible";
import { AlertType } from "../types";
import MultiAlert from "../components/MultiAlert";
import { Button } from "@mui/joy";

function Cars() {
  document.title = "Milage | Cars";
  const [cars, setCars] = useState<any[]>([]);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
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

    fetch("/api/cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("[server]: Error fetching cars");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data.cars);
      })
      .catch((e: any) => {
        setAlert({ type: "Error", message: e.message, show: true });
      });
  }, []);
  const carsmap = cars.map((car, index) => {
    return (
      <div
        key={`${car.car_id}`}
        className="text-white d-flex justify-content-between"
      >
        <p>`Car #{index + 1}`</p>
        <p>{`${car.make}`}</p>
        <p>{`${car.model}`}</p>
        <p>{`${car.year}`}</p>
      </div>
    );
  });
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
            <Collapsible title={"Register a car"}>
              TODO: make "Register a car" form
            </Collapsible>
          </div>
          <div className="col-12 col-md-6 mb-1 mb-md-0">
            <Collapsible title={"Join a car"}>
              TODO: make "Join a car" form
            </Collapsible>
          </div>
        </section>
        <section>
          <>
            <MultiAlert
              show={alert.show}
              type={alert.type}
              message={alert.message}
            />
            {cars.length === 0 ? (
              <div className="d-flex justify-content-between align-items-center">
                <p>No cars found</p>
                <Button>Register a new car</Button>
              </div>
            ) : (
              <>{carsmap}</>
            )}
          </>
        </section>
      </section>
    </>
  );
}

export default Cars;
