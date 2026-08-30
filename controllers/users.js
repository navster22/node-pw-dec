const users = [
    {id: 1, name: "Navneet", role: "Developer"},
    {id: 2, name: "Max", role: "Designer"},
    {id: 3, name: "Deepak", role: "Manager"}
]

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