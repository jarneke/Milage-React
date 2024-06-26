import { ObjectId } from "mongodb";
export interface Trip {
    _id?: ObjectId;
    userId: ObjectId;
    date: Date;
    start: number;
    end: number;
}
export interface Tank {
    _id?: ObjectId;
    payedUserId: ObjectId;
    familyId: ObjectId;
    milage: number;
    users: userIdPayed[];
    date: Date;
    cost: number;
    trips: ObjectId[];
}
export type userIdPayed = { userId: ObjectId, payed: boolean };
export interface User {
    _id?: ObjectId;
    fName: string;
    lName: string;
    familyId?: ObjectId;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
}
export interface Car {
    _id?: ObjectId;
    model: string;
    brand: string;
    totalMilage: number;
    family: ObjectId;
}
export interface Family {
    _id?: ObjectId;
    cars: ObjectId[];
    members: ObjectId[];
}
export interface AlertType {
    show: boolean;
    type: "Error" | "Success" | "Info" | "Warning" | "";
    message: string;
}

