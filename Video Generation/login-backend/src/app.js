import express from "express";
import cors from "cors";
import userroute from "./routes/auth.route.js"
const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.static("public"))

app.use("/api/", userroute);










export default app;