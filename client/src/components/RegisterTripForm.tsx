import { useEffect, useState } from "react";
import MultiAlert from "./MultiAlert";
import { AlertType } from "../types";
import { Button } from "@mui/joy";

function RegisterTripForm() {
  const [cars, setCars] = useState<any[]>([]);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    type: "",
    message: "",
  });
  const [car, setCar] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

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
        console.log(data);

        setCars(data.cars);
      })
      .catch((e: any) => {
        setAlert({ type: "Error", message: e.message, show: true });
      });
  }, []);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAlert({ show: false, type: "Success", message: "test" });
    const post = await fetch("/api/trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        car_id: car,
        date,
        start,
        end,
      }),
    });
    const res = await post.json();
    console.log(res);
  }
  return (
    <>
      <MultiAlert show={alert.show} type={alert.type} message={alert.message} />
      {cars.length === 0 ? (
        <div className="d-flex justify-content-between align-items-center">
          <p>No cars found</p>
          <Button>Register a new car</Button>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="form-label" htmlFor="car">
            Car
          </label>
          <select
            className="form-select"
            name="car"
            id="car"
            required
            onChange={(e) => setCar(e.target.value)}
          >
            {cars.map((car) => (
              <option key={car.car_id} value={car.car_id}>
                {car.make + " " + car.model}
              </option>
            ))}
          </select>
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control"
            type="date"
            name="date"
            id="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <label className="form-label" htmlFor="start">
            Start
          </label>
          <input
            className="form-control"
            type="number"
            name="start"
            id="start"
            required
            onChange={(e) => setStart(e.target.value)}
          />
          <label className="form-label" htmlFor="end">
            End
          </label>
          <input
            className="form-control"
            type="number"
            name="end"
            id="end"
            required
            onChange={(e) => setEnd(e.target.value)}
          />
          <Button className="mt-3" type="submit">
            Register
          </Button>
        </form>
      )}
    </>
  );
}

export default RegisterTripForm;
