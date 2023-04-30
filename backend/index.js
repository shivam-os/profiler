const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport")
require("dotenv").config()
require("./config/db");
require("./config/passport")(passport);
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const PORT = 3007;

//Required Middlewares
app.use(cors({
  origin: process.env.APP_URL,
  
}));
app.use(express.json());
app.use(morgan("dev"));

//App routes
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
