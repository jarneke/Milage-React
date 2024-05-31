import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect, familiesCollection, tanksCollection, tripsCollection, userCollection } from "./db";
import { Tank, Trip, User } from "./types";
import { ObjectId } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/users/login', async (req, res) => {
    const email = req.body.email;
    if (!email) {
        console.log('[server]: Email not found');
        res.status(400).json({ error: 'Email not found' });
        return;
    }
    const user = await userCollection.findOne({ email });
    if (!user) {
        console.log('[server]: User not found');
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const password = req.body.password;
    if (!password) {
        console.log('[server]: Password not found');
        res.status(400).json({ error: 'Password not found' });
        return;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.log('[server]: Invalid password');
        res.status(400).json({ error: 'Invalid password' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.log('[server]: JWT_SECRET not set');
        res.status(500).json({ error: 'JWT_SECRET not set' });
        return;
    }
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
    res.json({ token });
})
app.post('/api/users/register', async (req, res) => {
    const user = await userCollection.findOne({ email: req.body.email });
    if (user) {
        console.log('[server]: User already exists');
        res.status(400).json({ error: 'User already exists' });
        return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser: User = {
        email: req.body.email,
        password: hashedPassword,
        role: "USER"
    };
    try {
        await userCollection.insertOne(newUser);
        console.log('[server]: User created');
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error('[server]: Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
})
app.get('/api/trips', async (req, res) => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);

    if (!today || !lastMonth) {
        res.status(500).json({ error: 'Error getting dates' });
        return;
    }

    console.log(today, lastMonth);

    const trips = await tripsCollection.find({
        date: {
            $gte: lastMonth,
            $lte: today
        }
    }).toArray();

    if (!trips || trips.length === 0) {
        res.status(200).json({ message: 'No trips found' });
        return;
    }

    res.json(trips);
});
app.post('/api/trip/new', async (req, res) => {
    const user = await userCollection.findOne({ email: req.body.userEmail });
    if (!user) {
        console.log('[server]: User not found');
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const { start, end, date } = req.body;
    const startmilage: number = parseInt(start);
    const endmilage: number = parseInt(end);
    if (isNaN(startmilage) || isNaN(endmilage)) {
        res.status(400).json({ error: 'Parsing error' });
        return;
    }
    const trip: Trip = {
        userId: new ObjectId(user?._id),
        start: startmilage,
        end: endmilage,
        date: date ? date : new Date()
    };
    const result = await tripsCollection.insertOne(trip);
    if (!result.acknowledged) {
        console.log('[server]: Error inserting trip');
        res.status(500).json({ error: 'Error inserting trip' });
        return;
    } else {
        console.log('[server]: Trip inserted');
        res.status(200).json({ message: 'Trip inserted' });
    }

});
app.delete('/api/trip/delete', async (req, res) => {
    const user = await userCollection.findOne({ email: req.body.userEmail });
    if (!user) {
        console.log('[server]: User not found');
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const tripId: string = req.body.tripId;
    if (!tripId) {
        console.log('[server]: Trip ID not found');
        res.status(400).json({ error: 'Trip ID not found' });
        return;
    }
    const result = await tripsCollection.deleteOne({ _id: new ObjectId(tripId) });
    if (!result.acknowledged) {
        console.log('[server]: Error deleting trip');
        res.status(500).json({ error: 'Error deleting trip' });
        return;
    } else {
        console.log('[server]: Trip deleted');
        res.status(200).json({ message: 'Trip deleted' });
    }
})
app.get('/api/tanks', async (req, res) => {
    const today = new Date();
    const lastSixMonths = new Date(today.getFullYear(), today.getMonth() - 6);
    if (!today || !lastSixMonths) {
        res.status(500).json({ error: 'Error getting dates' });
        return;
    }
    const tanks = await tanksCollection.find({
        date: {
            $gte: lastSixMonths,
            $lte: today
        }
    }).toArray();
    if (!tanks || tanks.length === 0) {
        res.status(200).json({ message: 'No tanks found' });
        return;
    }
    res.json(tanks);
})
app.post('/api/tank/new', async (req, res) => {
    const familyId: string = req.body.familyId;
    if (!familyId) {
        console.log('[server]: Family ID not found');
        res.status(400).json({ error: 'Family ID not found' });
        return;
    }
    const family = await familiesCollection.findOne({ _id: ObjectId.createFromHexString(familyId) });
    if (!family) {
        console.log('[server]: Family not found');
        res.status(404).json({ error: 'Family not found' });
        return;
    }
    const userEmail: string = req.body.email;
    if (!userEmail) {
        console.log('[server]: User email not found');
        res.status(400).json({ error: 'User email not found' });
        return;
    }
    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
        console.log('[server]: User not found');
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const cost: number = parseInt(req.body.cost);
    if (isNaN(cost)) {
        console.log('[server]: Cost is not a number');
        res.status(400).json({ error: 'Cost is not a number' });
        return;
    }
    const date: Date = new Date(req.body.date);
    if (!date) {
        console.log('[server]: Invalid date');
        res.status(400).json({ error: 'Invalid date' });
        return;
    }
    const milage: number = parseInt(req.body.milage);
    if (isNaN(milage)) {
        console.log('[server]: Milage is not a number');
        res.status(400).json({ error: 'Milage is not a number' });
        return;
    }
    const tanks = await tanksCollection.find({ familyId: new ObjectId(familyId) }).sort({ date: -1 }).limit(1).toArray();
    const lastTank = tanks[0];
    const trips = await tripsCollection.find({
        date: {
            $gte: lastTank?.date,
            $lte: date
        },
        userId: new ObjectId(user?._id)
    }).toArray();
    const tank: Tank = {
        familyId: new ObjectId(family?._id),
        payedUserId: new ObjectId(user?._id),
        cost: cost,
        date: date,
        trips: trips.map(trip => new ObjectId(trip._id)),
        milage: milage,
        users: trips.map(trip => ({ userId: new ObjectId(trip.userId), payed: false }))
    };
    const result = await tanksCollection.insertOne(tank);
    if (!result.acknowledged) {
        console.log('[server]: Error inserting tank');
        res.status(500).json({ error: 'Error inserting tank' });
        return;
    } else {
        console.log('[server]: Tank inserted');
        res.status(200).json({ message: 'Tank inserted' });
    }
})
app.delete('/api/tank/delete', async (req, res) => {
    const user = await userCollection.findOne({ email: req.body.userEmail });
    if (!user) {
        console.log('[server]: User not found');
        res.status(404).json({ error: 'User not found' });
        return;
    }
    const tankId: string = req.body.tankId;
    if (!tankId) {
        console.log('[server]: Tank ID not found');
        res.status(400).json({ error: 'Tank ID not found' });
        return;
    }
    const result = await tanksCollection.deleteOne({ _id: new ObjectId(tankId) });
    if (!result.acknowledged) {
        console.log('[server]: Error deleting tank');
        res.status(500).json({ error: 'Error deleting tank' });
        return;
    } else {
        console.log('[server]: Tank deleted');
        res.status(200).json({ message: 'Tank deleted' });
    }
})
app.listen(port, async () => {
    console.log("[server]: Connecting to database");
    await connect();
    console.log(`[server]: listening on port ${port}`);
});