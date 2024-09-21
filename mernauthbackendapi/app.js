import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/connecteDb.js";
import router from "./routes/UserRoute.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
//CORS POLICY
app.use(cors());
// DATABASE CONNECTION
connectDb(DATABASE_URL);

//JSON
app.use(express.json());

//Load routes
app.use("/api/user", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
