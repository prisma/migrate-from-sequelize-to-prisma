const express = require('express')
const routes = require('./routes')
const { sequelize } = require('./models')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes)

app.get('/', (req, res) => {
    res.json({ "hello": "world" })
})

sequelize.sync({ force: true }).then(async () => {
    app.listen(port, () => {
        console.log(`🚀 Server ready at: http://localhost:${port}`)
    })
}) 