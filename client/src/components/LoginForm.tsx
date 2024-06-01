import { Key, Mail } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { IconButton, Input, colors } from "@mui/joy";
import React, { useEffect, useState } from "react";
import LabelFor from "./LabelFor";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";

interface AlertType {
  show: boolean;
  type: "Error" | "Success" | "Info" | "Warning" | "";
  message: string;
}
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    localStorage.getItem("token") && (window.location.href = "/app");
  });
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/app";
    } catch (error: any) {
      setAlert({ show: true, type: "Error", message: error.message });
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="text-light">
      <h3
        className="Display-3"
        style={{ color: "#F0F0F099", fontWeight: "bold", fontSize: "1.3rem" }}
      >
        WELCOME BACK
      </h3>
      <h1
        className="Display-1"
        style={{ fontWeight: "bold", fontSize: "2.6rem" }}
      >
        Access Your Account <span style={{ color: "#FFA500" }}>.</span>
      </h1>
      <h3
        className="Display-6 mt-4"
        style={{ color: "#F0F0F055", fontSize: "1rem" }}
      >
        Not Yet A Member?{" "}
        <a
          href="/register"
          style={{
            textDecoration: "none",
            color: "#FFA500BB",
          }}
        >
          Register
        </a>
      </h3>
      <div className="d-flex flex-wrap gap-3 col-12 col-sm-10 col-md-8">
        <div className="col-12">
          <LabelFor HTMLFor="email" label="Email" />
          <Input
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="example@ex.com"
            startDecorator={<Mail />}
            sx={{
              "&::before": {
                border: "3px solid #FFA500",
                transform: "scaleX(0)",
                left: "5",
                right: "5",
                bottom: 0,
                top: "unset",
                transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                borderRadius: 0,
                borderBottomLeftRadius: "40px 20px",
                borderBottomRightRadius: "40px 20px",
              },
              "&:focus-within::before": {
                transform: "scaleX(1)",
              },
            }}
          />
        </div>
        <div className="col-12">
          <LabelFor HTMLFor="password" label="Password" />
          <Input
            className="mb-1"
            type="password"
            placeholder="********"
            startDecorator={<Key />}
            value={password}
            onChange={handlePasswordChange}
            sx={{
              "&::before": {
                border: "3px solid #FFA500",
                transform: "scaleX(0)",
                left: "5",
                right: "5",
                bottom: 0,
                top: "unset",
                transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                borderRadius: 0,
                borderBottomLeftRadius: "40px 20px",
                borderBottomRightRadius: "40px 20px",
              },
              "&:focus-within::before": {
                transform: "scaleX(1)",
              },
            }}
          />
        </div>
        <Button
          style={{ color: "#202f3a", backgroundColor: "#FFA500" }}
          type="submit"
          className="w-100 mt-3"
        >
          Login
        </Button>
        {alert.show && (
          <Alert
            className="col-12"
            style={{
              backgroundColor: "#FF000055",
              color: "#F0F0F0",
            }}
            startDecorator={<WarningIcon />}
            endDecorator={
              <React.Fragment>
                <IconButton variant="soft" size="sm" color="danger">
                  <CloseIcon />
                </IconButton>
              </React.Fragment>
            }
          >
            {alert.message}
          </Alert>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
