require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const sequelize = require("./db");
const Todo = require("./Todo");
const passport = require("./auth");

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.post("/auth/login", (req, res) => {
    const {username, password} = req.body;

    if(username !== "admin" || password !== "password") {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
       {userId: 1},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.json({token})
})

app.get("/todos", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const todos = await Todo.findAll();

    res.json(todos);
})

app.post("/todos", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const todo = await Todo.create({
        title: req.body.title
    })

    res.status(201).json(todo);
})

app.put("/todos/:id", passport.authenticate("jwt", {session: false}),
async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    if(!todo){
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    await todo.update({
        title: req.body.title,
        completed: req.body.completed
    })

    res.json(todo);
}
)

app.delete("/todos/:id", passport.authenticate("jwt", {session: false}),
async (req, res) => {
    const todo = await Todo.findByPk(req.params.id);

    if(!todo){
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    await todo.destroy();

    res.status(204).json({
            message: `Todo with Id: ${req.params.id} is deleted`
    });
}
)

async function start(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log("MySQL DB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    } catch(error) {
        console.error(error)
    }
}

start();