import { Router } from "express";
import { client } from "../db";

export default function UserRouters() {
    const router = Router();

    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const { rows } = await client.query(`SELECT * FROM users WHERE user_id = ${id}`);
            return res.status(200).json({ user: rows[0] });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    })

    return router;
}