require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require('cors');
const publicRoutes = require ('./src/public/routes/index')
const routes = require("./src/routes/index")
const jwt = require ('./src/utils/jwt')
const db = require("./src/utils/db")
const app = express()
const port = process.env.PORT || 3000

db.connect()
app.use(cors("*"));
app.use(express.json())
app.use(morgan("dev"))

app.use("/", publicRoutes)
app.use('/api', jwt.verify, routes)

app.use((resp, req, res, next)=>{
    res.status(resp.status).send(resp.send)
})

app.listen(port,()=>{
    console.log(`Server is listening in port ${port}`)
})