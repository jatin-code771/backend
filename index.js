import express, { urlencoded } from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";



// import all routes

import userRoutes from "./routes/user.routes.js"
import { registeruser } from "./controller/user.controller.js";

dotenv.config()
const app = express()
const port = process.env.PORT || 5000;

app.use(urlencoded({extended:true}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Cohort!')
})
app.get('/hitesh', (req, res) => {
  res.send('Hitesh!')
})
app.get("/piyush",(req,res)  => {
    res.send("Piyush!");
})

// connects to db
db();

// user routes

app.use("/api/v1/users", userRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
