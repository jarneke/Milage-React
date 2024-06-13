import express from "express";
import dotenv from "dotenv";
import { client, connect, disconnect } from "./db";
import LoginRouters from "./routers/login";
import CarsRouters from "./routers/cars";
import TripsRouter from "./routers/trips";

dotenv.config();
export const JWT_KEY: string = `${process.env.JWT_SECRET}`;

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/users", LoginRouters());
app.use("/api/cars", CarsRouters());
app.use("/api/trips", TripsRouter());
const server = app.listen(port, async () => {
    await connect();
    console.log(`Example app listening at http://localhost:${port}`);

});
const gracefulShutdown = async () => {
    console.log("Shutting down gracefully...");
    server.close(async () => {
        await disconnect();
        console.log("Server and database connections closed.");
        process.exit(0);
    });
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);