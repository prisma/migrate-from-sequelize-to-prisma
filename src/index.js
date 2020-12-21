const express = require("express")
const routes = require("./routes")

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", routes)

app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`)
})
