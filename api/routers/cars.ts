import { Router } from "express";
import { client } from "../db";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../server";
import authenticateToken from "../middleWare/authMiddleware";
export default function CarsRouters() {
    const router = Router();
    router.get("/", authenticateToken, async (req, res) => {
        const { email } = req.body;
        try {

            const query = `
      SELECT cars.make, cars.model, cars.year
      FROM users
      JOIN users_cars ON users.user_id = users_cars.user_id
      JOIN cars ON users_cars.car_id = cars.car_id
      WHERE users.email = '${email}';
    `;

            const { rows } = await client.query(query);
            return res.status(200).json({ cars: rows });
        } catch (error) {

        }
    })
    return router;
}