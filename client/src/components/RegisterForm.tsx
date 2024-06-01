import { Mail, Key, Badge } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Alert,
  Button,
  IconButton,
  Input,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import LabelFor from "./LabelFor";
import { useState } from "react";
import React from "react";
interface AlertType {
  show: boolean;
  type: "Error" | "Success" | "Info" | "Warning" | "";
  message: string;
}
function RegisterForm() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    show: false,
    type: "",
    message: "",
  });
  const minLength = 8;
  function handleFNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFName(event.target.value);
  }
  function handleLNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLName(event.target.value);
  }
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  }
  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  }
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fName, lName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlert({ show: true, type: "Error", message: data.error });
        } else {
          setAlert({ show: true, type: "Success", message: data.message });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      })
      .catch((error) => {
        setAlert({ show: true, type: "Error", message: error.message });
      });
  }
  return (
    <form onSubmit={handleFormSubmit} className="text-light">
      <h3
        className="Display-3"
        style={{ color: "#F0F0F099", fontWeight: "bold", fontSize: "1.3rem" }}
      >
        START FOR FREE
      </h3>
      <h1
        className="Display-1"
        style={{ fontWeight: "bold", fontSize: "2.6rem" }}
      >
        Create new account <span style={{ color: "#FFA500" }}>.</span>
      </h1>
      <h3
        className="Display-6 mt-4"
        style={{ color: "#F0F0F055", fontSize: "1rem" }}
      >
        Already A Member?{" "}
        <a
          href="/login"
          style={{
            textDecoration: "none",
            color: "#FFA500BB",
          }}
        >
          Login
        </a>
      </h3>
      <div className="d-flex flex-wrap gap-3 col-12 col-sm-10 col-md-8">
        <div style={{ width: "calc(50% - .5rem)" }}>
          <LabelFor HTMLFor="fName" label="First Name" />
          <Input
            value={fName}
            onChange={handleFNameChange}
            type="text"
            placeholder="John"
            startDecorator={<Badge />}
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
        <div style={{ width: "calc(50% - 0.5rem)" }}>
          <LabelFor HTMLFor="lName" label="Last Name" />
          <Input
            value={lName}
            onChange={handleLNameChange}
            type="text"
            placeholder="Doe"
            startDecorator={<Badge />}
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
        <div className="col-12" style={{ marginTop: "-.25rem" }}>
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
          <Stack
            className="col-12"
            spacing={0.5}
            sx={{
              "--hue": Math.min(password.length * 10, 120),
            }}
          >
            <LabelFor HTMLFor="password" label="Password" />
            <Input
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
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((password.length * 100) / minLength, 100)}
              sx={{
                bgcolor: "background.level3",
                color: "hsl(var(--hue) 80% 40%)",
              }}
            />
            <Typography
              level="body-xs"
              sx={{
                alignSelf: "flex-end",
                color: "hsl(var(--hue) 80% 30%)",
              }}
            >
              {password.length < 1 && "Very weak"}
              {password.length >= 2 && password.length < 4 && "Weak"}
              {password.length >= 4 && password.length < 8 && "Strong"}
              {password.length >= 8 && password.length < 16 && "Very strong"}
              {password.length >= 16 &&
                password.length < 32 &&
                "Extremely strong !"}
              {password.length >= 32 &&
                password.length < 64 &&
                "! Super strong !"}
              {password.length >= 64 && "!!! Your overdoing it !!!"}
            </Typography>
          </Stack>
        </div>
        <div className="col-12" style={{ marginTop: "-1.4rem" }}>
          <Stack
            className="col-12"
            spacing={0.5}
            sx={{
              "--hue": confirmPassword === password ? 120 : 0,
            }}
          >
            <LabelFor HTMLFor="confirmPassword" label="Confirm Password" />
            <Input
              className="mb-1"
              type="password"
              placeholder="********"
              startDecorator={<Key />}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
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
            <LinearProgress
              determinate
              size="sm"
              value={100}
              sx={{
                bgcolor: "background.level3",
                color: "hsl(var(--hue) 80% 40%)",
              }}
            />
            <Typography
              level="body-xs"
              sx={{
                alignSelf: "flex-end",
                color: "hsl(var(--hue) 80% 30%)",
              }}
            >
              {confirmPassword === password && "Passwords Match"}
              {confirmPassword !== password && "Passwords Do Not Match"}
            </Typography>
          </Stack>
        </div>
        <div className="col-12" style={{ marginTop: "-.6rem" }}>
          <Button
            style={{
              color: "#202f3a",
              backgroundColor: "#FFA500",
            }}
            type="submit"
            className="w-100 mt-3"
          >
            Register
          </Button>
        </div>
        {alert.show &&
          (alert.type === "Error" ? (
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
          ) : (
            <Alert
              className="col-12"
              style={{
                backgroundColor: "#00FF0055",
                color: "#F0F0F0",
              }}
              startDecorator={<WarningIcon />}
              endDecorator={
                <React.Fragment>
                  <IconButton variant="soft" size="sm" color="success">
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>
              }
            >
              {alert.message}
            </Alert>
          ))}
      </div>
    </form>
  );
}

export default RegisterForm;
