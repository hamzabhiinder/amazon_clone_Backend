import express from "express";
import cors from "cors";
import { } from "./src/connection/db_connection.mjs";
import authRouter from "./src/routes/auth.mjs";
import adminRouter from "./src/routes/admin.mjs";


import morgan from 'morgan';
import productRouter from "./src/routes/product.mjs";



const app = express();
const port = 3000

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(adminRouter)
app.use(productRouter)



app.listen(port, () => {
    console.log(`Example app listening on ports ${port} `)
})






