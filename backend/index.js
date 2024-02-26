import Api from "./Api.js";
import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/convert', Api)

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
