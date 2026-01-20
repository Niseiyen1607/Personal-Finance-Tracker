const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
