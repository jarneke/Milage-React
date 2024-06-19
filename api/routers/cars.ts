import { Router } from "express";
import { client } from "../db";
import authenticateToken from "../middleWare/authMiddleware";
export default function CarsRouters() {
    const router = Router();
    router.get("/", authenticateToken, async (req, res) => {
        const { user } = req.body;
        try {

            const query = `
      SELECT cars.car_id, cars.make, cars.model, cars.year, cars.owner
      FROM users
      JOIN users_cars ON users.user_id = users_cars.user_id
      JOIN cars ON users_cars.car_id = cars.car_id
      WHERE users.email = '${user.email}';
    `;

            const { rows } = await client.query(query);
            return res.status(200).json({ cars: rows });
        } catch (error) {

            return res.status(500).json({ error: 'Internal server error' });
        }
    })
    return router;
}