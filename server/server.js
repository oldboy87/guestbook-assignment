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
app.get("/", (req, res) => {
  res.json({ message: "Root route" });
});

app.post("/feedback", (req, res) => {
  const feedback = req.body.formValues;
  console.log(feedback);
  const query = db.query(
    `INSERT INTO userfeedback (firstname, surname, email, gender, age, immersion, acting, challenge, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      feedback.firstname,
      feedback.surname,
      feedback.email,
      feedback.gender,
      feedback.age,
      feedback.immersion,
      feedback.acting,
      feedback.challenge,
      feedback.comment,
    ]
  );
  res.json({ status: "success", values: feedback });
});
