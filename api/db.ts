import dotenv from "dotenv";
import { Client } from "pg";
import { User } from "./types";
import bcrypt from "bcrypt";

dotenv.config();

export const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    application_name: "$ Milage API"
});

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        client.query("USE milage;");

        await initializeDatabase();
        await seedDbWithTempData();
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}
async function seedDbWithTempData() {
    // Create initial admin user
    const adminMail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminFirstName = process.env.ADMIN_FIRST_NAME;
    const adminLastName = process.env.ADMIN_LAST_NAME;

    let adminUserId: number | null = null;

    if (adminMail && adminPassword && adminFirstName && adminLastName) {
        const userExists = await checkUserExists(adminMail);
        if (userExists) {
            console.log("Admin user already exists");
            adminUserId = await getUserIdByEmail(adminMail);
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const query = `INSERT INTO users (fName, lName, email, password, role) VALUES ($1, $2, $3, $4, 'ADMIN') RETURNING user_id`;
            const result = await client.query(query, [adminFirstName, adminLastName, adminMail, hashedPassword]);
            adminUserId = result.rows[0].user_id;

            console.log("Admin user created");
        }
    }

    // Create a temporary car object and link it to the admin user
    if (adminUserId !== null) {
        const tempCar = {
            make: 'Mercedes',
            model: 'B180',
            year: 2006
        };

        const carQuery = `INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING car_id`;
        const carResult = await client.query(carQuery, [tempCar.make, tempCar.model, tempCar.year]);
        const carId = carResult.rows[0].car_id;

        const usersCarsQuery = `INSERT INTO users_cars (user_id, car_id) VALUES ($1, $2)`;
        await client.query(usersCarsQuery, [adminUserId, carId]);

        console.log("Temporary car added and linked to admin user");

        // Add trips for the admin user with the car
        const trips = [
            { trip_date: '2024-01-01', start_km: 1000, end_km: 1100 },
            { trip_date: '2024-01-05', start_km: 1100, end_km: 1200 },
            { trip_date: '2024-01-10', start_km: 1200, end_km: 1300 },
        ];

        for (const trip of trips) {
            const tripQuery = `INSERT INTO trips (car_id, user_id, trip_date, start_km, end_km) VALUES ($1, $2, $3, $4, $5)`;
            await client.query(tripQuery, [carId, adminUserId, trip.trip_date, trip.start_km, trip.end_km]);
        }

        console.log("Trips added for admin user");
    }
}
export async function disconnect() {
    try {
        await client.end();
        console.log("Disconnected from database");
    } catch (error) {
        console.log("Error disconnecting from database:", error);
    }
}
export async function checkUserExists(email: string): Promise<boolean> {
    const result = await client.query(`
        SELECT EXISTS (
            SELECT 1 
            FROM users 
            WHERE email = $1
        );
    `, [email]);
    return result.rows[0].exists;
}
async function initializeDatabase() {
    const tables = ['trips', 'users_cars', 'cars', 'users']; // add more table names when needed

    for (const table of tables) {
        const tableExists = await checkTableExists(table);
        if (tableExists) {
            await client.query(`DROP TABLE IF EXISTS ${table}`);
        }
    }
    const usersTableExists = await checkTableExists('users');
    const carsTableExists = await checkTableExists('cars');
    const usersCarsTableExists = await checkTableExists('users_cars');
    const tripsTableExists = await checkTableExists('trips');

    if (!usersTableExists) {
        await createUsersTable();
    }

    if (!carsTableExists) {
        await createCarsTable();
    }

    if (!usersCarsTableExists) {
        await createUsersCarsTable();
    }

    if (!tripsTableExists) {
        await createTripsTable();
    }
}

async function checkTableExists(tableName: string): Promise<boolean> {
    const result = await client.query(`
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = $1
        );
    `, [tableName]);
    return result.rows[0].exists;
}
async function createUsersTable() {
    await client.query<User>(`CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY,fName VARCHAR(255) NOT NULL,lName VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,role VARCHAR(10) NOT NULL);`);
    console.log("Users table created");

}

async function createCarsTable() {
    await client.query(`CREATE TABLE cars (car_id SERIAL PRIMARY KEY,make VARCHAR(255) NOT NULL,model VARCHAR(255) NOT NULL,year INT NOT NULL);`);
    console.log("Cars table created");
}

async function createUsersCarsTable() {
    await client.query(`CREATE TABLE users_cars (user_id INT NOT NULL,car_id INT NOT NULL,PRIMARY KEY (user_id, car_id),FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (car_id) REFERENCES cars(car_id));`);
    console.log("Users cars table created");
}
async function createTripsTable() {
    await client.query(`
        CREATE TABLE IF NOT EXISTS trips (
            trip_id SERIAL PRIMARY KEY,
            car_id INT NOT NULL,
            user_id INT NOT NULL,
            trip_date DATE NOT NULL,
            start_km INT NOT NULL,
            end_km INT NOT NULL,
            FOREIGN KEY (car_id) REFERENCES cars(car_id),
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        );
    `);
    console.log("Trips table created");
}
export async function getUserIdByEmail(email: string): Promise<number | null> {
    const result = await client.query(`
        SELECT user_id 
        FROM users 
        WHERE email = $1
    `, [email]);
    return result.rows.length > 0 ? result.rows[0].user_id : null;
}
