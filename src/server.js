import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
// import connection from "./config/connect";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";


const app = express();
const PORT = process.env.PORT || 8080;
// config Cors
configCors(app)
//config view engine 
configViewEngine(app);



// config body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection 
//connection();

// init web routes 
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT, () => {
    console.log(">>>>JWT Backenddd is running on the port = " + PORT);
})                     