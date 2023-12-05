const express =  require("express")
const router =  express.Router() //nos permite generar rutas fuera del script principal app.js

router.get("/", (req, res)=>{
    res.status(200).send("Hola mundo desde posts")
})

module.exports = router