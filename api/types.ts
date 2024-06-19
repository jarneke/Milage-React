export interface User {
    user_id: number;
    fName: string;
    lName: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER"
}
export interface Car {
    car_id: number;
    make: string;
    model: string;
    year: number;
    owner: number;
}

export interface UserCar {
    user_id: number;
    car_id: number;
}