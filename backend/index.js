const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = 3007;

//Required Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//App routes


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
