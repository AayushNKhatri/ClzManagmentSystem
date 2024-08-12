  import express from "express";
  import morgan from "morgan";
  import dotenv from "dotenv";
  import { dbConnect } from "./mongo/dbConnection.js";

  const app = express();
  dotenv.config();
  app.use(express.json());
  app.use(morgan("combined"));
  import studentRouter from "./routes/Student.route.js";

  dbConnect();

  app.use("/Student", studentRouter);

  app.listen(process.env.PORT, () => {
    console.log("Server Connected Successfully"); 

  });

