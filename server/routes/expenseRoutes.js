const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.route("/").get(getExpenses).post(createExpense);

srouter.route("/:id").delete(deleteExpense);

module.exports = router;
