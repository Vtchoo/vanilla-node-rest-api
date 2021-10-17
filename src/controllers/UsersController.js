let users = require("../mocks/users")

module.exports = {
    listUsers: (req, res) => {
        const { order } = req.query
        const sortedUsers = users.sort((a, b) => {
            if (order === 'desc') {
                return b.id - a.id
            }
            return a.id - b.id
        })
        res.send(200, sortedUsers)
    },
    getUserById: (req, res) => {
        const { id } = req.params

        const user = users.find(u => u.id == id)

        if (!user) {
            return res.send(404, { error: 'Usr not found' })
        }

        res.send(200, user)
    },
    createUser: (req, res) => {
        const lastUserId = users[users.length - 1].id
        
        const newUser = {
            name: req.body.name,
            id: lastUserId + 1
        }

        users.push(newUser)

        res.send(200, newUser)
    },
    editUser: (req, res) => {

        const { id } = req.params

        const { name } = req.body

        const existingUser = users.find(user => user.id == id)

        if (!existingUser) {
            return res.send(404, { error: 'User not found' })
        }
        
        const newUser = {
            ...existingUser,
            name
        }
        
        users = users.map(user => user === existingUser ? newUser : user)

        res.send(200, newUser)
    },
    deleteUser: (req, res) => {
        
        const { id } = req.params
        
        const existingUser = users.find(user => user.id == id)
        
        if (!existingUser) {
            return res.send(404, { error: 'User not found' })
        }
        
        users = users.filter(user => user.id != id)
    
        res.send(209)
    }
}