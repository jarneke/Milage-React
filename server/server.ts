import express from "express";

const app = express()

app.listen(3000, () => {
    console.log("hello, world", 3000);
})