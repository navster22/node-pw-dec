const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "Users.json");
const users = JSON.parse(fs.readFileSync(filePath, "utf-8"))

function getUsers(req, res, next) {
    try{
        const {role} = req.query;

        if(!role) return res.json(users);
        
        const filteredUsers = users.filter(user => user.role === role);

        res.json(filteredUsers);
    } catch(err){
       next(err)
    }
}

module.exports = {
    getUsers
}