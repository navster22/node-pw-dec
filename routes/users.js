const express = require("express");
const {getUsers} = require("../controllers/users")

const router = express.Router();

const users = [
    {id: 1, name: "Navneet", role: "Developer"},
    {id: 2, name: "Max", role: "Designer"},
    {id: 3, name: "Deepak", role: "Manager"}
]

const authenticate = function(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "Authentication required"
        })
    }
    next();
}

router.get("/", getUsers)

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.json(user);
})

// Post Request

router.post("/", authenticate, (req, res) => {
    const {name, role} = req.body;

    const user = {
        id: users.length + 1,
        name,
        role
    }

    users.push(user);

    res.status(201).json({
        message: `User created successfully with id: ${user.id}`,
        user
    });
})

// Put Request

router.put("/:id", authenticate,(req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    user.name = req.body.name ?? user.name;
    user.role = req.body.role ?? user.role;

    res.json(user);

})

// delete Request

router.delete("/:id", authenticate,(req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if(index === -1){
        return res.status(404).json({
            message: "User not found"
        })
    }

    users.splice(index, 1);

    res.status(204).send();
})

module.exports = router;