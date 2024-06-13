import { Router } from "express";
import authenticateToken from "../middleWare/authMiddleware";
import { client } from "../db";

export default function TripsRouter() {
    const router = Router();

    router.post("/", authenticateToken, async (req, res) => {
        const { car, date, start, end, user } = req.body;

        try {
            const query = `INSERT INTO trips (car_id, user_id, trip_date, start_km, end_km) VALUES ($1, $2, $3, $4, $5)`
            await client.query(query, [car.car_id, user.user_id, date, start, end]);

            return res.status(200).json({ message: "Trip registered successfully" });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    })
    return router;
}