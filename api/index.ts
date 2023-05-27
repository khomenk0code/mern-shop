const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()


const PORT = 5000 || process.env.PORT;

mongoose.connect(
    process.env.MONGO_URL
)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err: Error) => {
        console.log(err);
    })

app.get("/api/test", () => {
    console.log("test is successfully")
})

app.listen(PORT, () => {
    console.log(`Backend server is running on port:${PORT}`)
})