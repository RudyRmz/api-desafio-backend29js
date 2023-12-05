require("dotenv").config()
const express =  require("express")
const morgan = require("morgan")
const routes = require("./src/routes/index")
const db = require("./src/utils/db")
//const jwt = require("./src/utils/jwt")
const publicRoutes = require("./src/public/routes")
const app = express()
const port = process.env.PORT || 3000

db.connect()

//midd para poder recibir bodys ded tipo json
app.use(express.json())

//para usar morgan
app.use(morgan("dev"))

app.use("/user", userRoutes)
app.use("/post", postRoutes)

//app.use("/", publicRoutes)
//app.use("/api",jwt.verify, routes)

//midd que se ejecuta despues 
app.use((resp, req, res, next)=>{
    res.status(resp.status).send(resp.send)
})

//app.use("/api/v1", routes)

//listener que se va a estar ejectuando todo el tiempo que esta al pendiente que se ejecute el servidor
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});