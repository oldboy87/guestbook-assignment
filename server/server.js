import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

//config cors and express:
app.use(cors());
app.use(express.json());

//port:
const PORT = 8080;

app.listen(PORT, function () {
  console.log(`Server is running in port ${PORT}`);
});

// root route:
app.get("/", function (request, response) {
  response.json({ message: "Root route" });
});

app.post("/feedback", async function (request, reponse) {
  const feedback = await request.body.formValues;
  console.log(feedback);
});
