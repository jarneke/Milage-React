import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client, connect, disconnect } from "../db";
import dotenv from "dotenv";
dotenv.config();

const JWT_KEY: string = `${process.env.JWT_SECRET}`;

export default function LoginRouters() {
    const router = Router();
    router.post("/login", async (req, res) => {
        const { email, password } = req.body;

        try {
            const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
            if (rows.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const token = jwt.sign({ userId: user._id, email: user.email }, JWT_KEY, { expiresIn: "1h" });
            return res.status(200).json({ message: "login successful", token: token });
        } catch (e: any) {
            res.status(500).json({ error: 'Internal server error' });
        }


    })
    router.post("/register", async (req, res) => {
        const { fName, lName, email, password } = req.body;

        try {
            const { rows } = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
            if (rows.length !== 0) {
                return res.status(401).json({ error: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const { rows: [user] } = await client.query(`INSERT INTO users (fName, lName, email, password, role) VALUES ('${fName}', '${lName}', '${email}', '${hashedPassword}', 'USER') RETURNING *`);

            const token = jwt.sign({ userId: user._id, email: user.email }, JWT_KEY, { expiresIn: "1h" });
            return res.status(200).json({ message: "registration successful", token: token });
        } catch (e: any) {
            console.log(e);

            res.status(500).json({ error: 'Internal server error' });
        }
    })
    return router;
}
