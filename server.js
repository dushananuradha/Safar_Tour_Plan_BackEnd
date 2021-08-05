const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;
app.use(cors());

const URL = process.env.MONGO_URL;

mongoose.connect(URL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection success");
});

const tourRouter = require("./routes/tours.js");
app.use("/tour", tourRouter); 

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
