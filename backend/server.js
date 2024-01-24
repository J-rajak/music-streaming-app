import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./db/conn.js";
import router from "./router/routes.js";


dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

app.use('/api', router);

connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server Connected to http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Cannot connect to the server");
  }
}).catch(err => {
    console.log("Invalid dbs connection....!");
})
