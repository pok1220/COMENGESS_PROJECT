import express from "express";
import cors from "cors";
import scoreboard from "./models/itemModel.js";
// import ItemRoute from "./routes/itemRoute.js";
// import MemberRoute from "./routes/memberRoute.js";
import filterRouter from "./routes/filterRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
// app.use("/items", ItemRoute);
// app.use("/members", MemberRoute);
app.use("/filter", filterRouter);
app.use("/", async (req, res) => {
    res.send(await scoreboard.find());
})

export default app;
