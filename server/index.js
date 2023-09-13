const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");

const connectDB = require("./config/db");
const { getTotal, getGrade, getAverage, formatDate } = require("./utils");

const app = express();

app.use(cors());

// Connect to MongoDB
process.env.MODE == "DEV"
  ? connectDB(process.env.MONGO_DEV)
  : connectDB(process.env.MONGO_LIVE);

// Body Parser
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));

//Public Folder
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  ".hbs",
  engine({
    defaultLayout: "result",
    extname: "hbs",
    helpers: { getTotal, getGrade, getAverage, formatDate },
  })
);

app.set("view engine", ".hbs");

// Routes
app.use("/api", require("./routes/api"));
app.use("/result", require("./routes/result"));

app.get("*", (req, res) => {
  try {
    return res.status(404).json("URL Not Found");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

// Port listening
app.listen(process.env.PORT, () => {
  console.log(`App Started on PORT ${process.env.PORT}`);
});
