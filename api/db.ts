import dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";
import { Trip, Tank, User, Family } from "./types"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
export const client = new MongoClient(uri);
const db = client.db("Milage");

async function exit() {
    try {
        await client.close();
        console.log("[server]: Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}
export async function connect() {
    try {
        await client.connect();
        console.log("[server]: Connected to database");
        await createInitialUsers();
        process.on("SIGINT", exit);
        process.on("SIGUSR2", exit);

    } catch (error) {
        console.error(error);
    }
}
export const tripsCollection: Collection<Trip> = db.collection<Trip>("trips");
export const tanksCollection: Collection<Tank> = db.collection<Tank>("tanks");
export const userCollection: Collection<User> = db.collection<User>("users");
export const familiesCollection: Collection<Family> = db.collection<Family>("families");

async function createInitialUsers() {
    console.log("[server]: Creating initial users");

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL) {
        console.log("[server]: ADMIN_EMAIL not set");
    }
    if (!ADMIN_PASSWORD) {
        console.log("[server]: ADMIN_PASSWORD not set");
    }
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        return;
    }

    const admin: User = {
        email: ADMIN_EMAIL,
        password: await bcrypt.hash(ADMIN_PASSWORD, 10),
        role: "ADMIN"
    };

    const user = await userCollection.findOne({ email: ADMIN_EMAIL });
    if (!user) {
        try {
            await userCollection.insertOne(admin);
            console.log("[server]: Initial admin created");

        } catch (error) {
            console.error("[server]: Error creating initial admin:", error);
        }
    } else {
        console.log("[server]: Admin already exists");
    }
}

export async function login(email: string, password: string) {
    const user = await userCollection.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not set");
    }
    return {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    };
}
