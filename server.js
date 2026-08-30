const express = require("express");
const usersRouter = require("./routes/users");

const app = express();

const PORT = 3000;

app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use("/users", usersRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: "Error",
        message: err.message
    })
})

app.get("/", (req, res)=>{
    res.json({
        message: "Welcome to Express.js server"
    })
})

app.use((req,res) => {
    res.status(404).json({
        messgae: "Route not present"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})