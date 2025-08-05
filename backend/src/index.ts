import "dotenv/config";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import environment from "./env-config.js";
import sequelize from "./config/database.js";
import workerRoutes from "./routes/worker.routes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/workers", workerRoutes);

const server = http.createServer(app);
server.listen(environment.port, () => {
  console.log(`server running on port ${environment.port}`);
});

sequelize
  .authenticate()
  .then(async () => {
    console.log(
      "Connection to Oracle database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the Oracle database:", err);
  });

// async function run() {
//   const connection = await OracleDB.getConnection({
//     user: environment.dbUser,
//     password: environment.dbPwd,
//     connectString: environment.dbConntectionString,
//   });

//   const result = await connection.execute(`select * from global_name`);

//   console.log(result.rows);
//   await connection.close();
// }

// run();
