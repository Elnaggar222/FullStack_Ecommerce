const express = require("express");
const app = express();
// ##
const mongoose = require("mongoose");
// ##
const dotenv = require("dotenv");
dotenv.config();
// ##
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");
const orderRoute = require("./Routes/Oder");
const stirpeRoute = require("./Routes/Stripe");
// ##
const cors = require("cors");
// ##

mongoose
  .connect(process.env.Mongo_Connection_String)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

// ##
app.use(express.json());
// ##
app.use(cors());
// ##

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stirpeRoute);
// ##
app.listen(5000, () => {
  console.log("Backend server is running");
});

// auth
// clothesStore
// ####################
//Password
// ZZaebNLi9x2cssyT
// ####################
//Connection String
//mongodb+srv://clothesStore:ZZaebNLi9x2cssyT@cluster0.8hc3jma.mongodb.net/?retryWrites=true&w=majority
