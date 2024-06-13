import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterTrip from "./pages/RegisterTrip";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import AppPage from "./pages/App";
import Cars from "./pages/Cars";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerTrip" element={<RegisterTrip />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/app/cars" element={<Cars />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
