import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
// import connection from "./config/connect";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
// import {CreateJWT, verifyToken} from "./middleware/JWTAction"
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8080;
// config Cors
configCors(app)
//config view engine 
configViewEngine(app);

// // JWT 
// CreateJWT()
// let decodedToken= verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSHVraGVuIiwidmFsdWUiOiJjdXRlZGVwdHJhaSIsImlhdCI6MTczMDEzMTE3M30.NLxzCL-dKhXaFM5Zk7vvtL5HBDFqzlgmxwtEgeG0OsM")
// console.log(decodedToken)
// config body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// config cookieParser 
app.use(cookieParser())
//test connection 
//connection();

// init web routes 
initWebRoutes(app);
initApiRoutes(app);


app.use((req, res) => {
    return res.send("404 not found")
})
app.listen(PORT, () => {
    console.log(">>>>JWT Backenddd is running on the port = " + PORT);
})                     