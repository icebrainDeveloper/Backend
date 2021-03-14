const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import * as mongoose from 'mongoose';
import {mongodb,PORT} from './src/config/configDev';
import {} from './src/config/configProd';
import {initRoles} from './src/lib/fasterX/initRoles';
import { userRoutes } from '../app/src/routes/user.routes';
import { authRoutes } from '../app/src/routes/auth.routes';
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(
   mongodb.mongoURI,
    {
    useUnifiedTopology: true,
    useNewUrlParser: true  }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  initRoles();
  res.json({ message: "Welcome to fasterX application." });
});

authRoutes(app);
userRoutes(app);

// set port, listen for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});