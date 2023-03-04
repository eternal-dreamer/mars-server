import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from './routes/users.js';
import cors from "cors";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://shrishtigoyal2608:w8Hids6sXRYWub2Q@cluster0.emmcfo0.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("strictQuery", false);


