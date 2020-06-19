const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
const mongoURI = "mongodb+srv://tandat198:0842693293@cluster0-m9uqf.mongodb.net/<dbname>?retryWrites=true&w=majority";
const app = express();

app.use(express.json({ extended: true }));

app.use("/api", cors(), require("./routes/api"));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log("Connect to MongoDB successfully"));

app.listen(port, console.log(`Server is running on port ${port}`));
