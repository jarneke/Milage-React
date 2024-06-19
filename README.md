# Milage-React

## Navigation

- [Intro](#intro)
- [Motivation](#motivation)
- [Installation/Setup](#installation-and-setup)

## Intro

Milage-React is a web application im making, it is designed to help groups of people manage their shared transportation. It allows you to track how much each person drives, making it easy to split the cost of gas.

## Motivation

I have been developing Milage, a car trip tracking app, as a personal project for a while. I decided to remodel it using React to learn React and improve my skills in web development. The new Milage-React application is a rewrite of the old Milage app, which was made using Express and EJS.

## Installation and Setup

Currently, the web application is not yet released, but you can run it locally.

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- A compatible database (e.g., [CockroachDB](https://www.cockroachlabs.com))

### Steps

Start by cloning this repository

```bash
git clone https://github.com/jarneke/Milage-React.git
```

Navigate to the project directory

```bash
cd Milage-React
```

Install the required dependencies

```bash
cd client
npm install
cd ../api
npm install
```

The backend needs a couple env variables, so go to the api map and create a .env file

```bash
cd api
touch .env
```

in the .env file fill in the following variables

- PORT: The port wich the backend will listen on
- DB_CONNECTION_STRING: The database connection string => [more info](https://www.cockroachlabs.com/docs/stable/connect-to-the-database.html?filters=linux)
- JWT_SECRET: [more info](https://en.wikipedia.org/wiki/JSON_Web_Token)
- ADMIN_EMAIL: mail used to log into admin account
- ADMIN_PASSWORD: password used for admin account
- ADMIN_FIRST_NAME: first name of admin user
- ADMIN_LAST_NAME: last name of admin user

Start the app locally with the start.sh script

```bash
bash start.sh
```

### Usage

After running the setup, open your browser and navigate to "http://localhost:PORT" to access the application. You can log in using the admin credentials specified in your .env file.
