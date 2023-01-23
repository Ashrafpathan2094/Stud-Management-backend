import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import studentRoutes from "./routes/student.js";

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

app.use('/students', studentRoutes);

const CONNECTION_URL = "mongodb://Stark:Stark2094@ac-fjtscrl-shard-00-00.95ghcza.mongodb.net:27017,ac-fjtscrl-shard-00-01.95ghcza.mongodb.net:27017,ac-fjtscrl-shard-00-02.95ghcza.mongodb.net:27017/?ssl=true&replicaSet=atlas-11x3jt-shard-0&authSource=admin&retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;


// mongoose.connect(constants.CONNECTION_URL)
//     .then(() => app.listen(constants.PORT, () => console.log(`Server Running on Port ${constants.PORT}`)))
//     .catch((error) => console.log(error.message));

// mongoose.Promise = global.Promise;

// mongoose.connect(CONNECTION_URL).then(() => app.listen(PORT, () =>
//     console.log(`Server running on port ${PORT}`))).catch((error) => console.log(error.message));




mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on port : ${PORT}`)
)).catch((err) => (console.log(err.message)
));


// const dotenv = require('dotenv');
// const mongoose = require('mongoose');

// dotenv.config();

// mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', false);


