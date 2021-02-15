//Load .env File
import dotenv from "dotenv"
dotenv.config()

//Imports
import express from "express"
import bodyparser from "body-parser"
import cors from "cors"

//Routers
import tarkov from "./tarkov"
import ddns from "./ddns"

//Constants
const PORT = process.env.PORT || 3000

//Init Webserver
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

//Start Webserver
app.listen(PORT, function() {
  console.log("API running on Port:" + PORT)
})

//Handle Routes
app.use(tarkov)
app.use(ddns)

app.get("/", function (req, res) {
  console.log("Get request on / : " + req)
  res.send("API online")
})
