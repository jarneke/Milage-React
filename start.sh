#!/bin/bash

# Navigate to the api directory and start the server
cd ./api/
npm start &
API_PID=$!

# Navigate to the client directory and start the client
cd ../client/
npm start &
CLIENT_PID=$!

# Wait for both processes to finish
wait $API_PID
wait $CLIENT_PID
