const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();

const api = process.env.API_URL;

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());

const userRoutes = require("./routes/userRoutes");

app.use(`${api}/add`, userRoutes);

/**
 * Connection status
 *
 */
const connectionDBStatus = async () => {
  try {
    //  stabilish the connetion
  } catch (error) {
    //   Throw an error
  }
};

app.listen(PORT, () => {
  console.log("listening on 3000");
});
