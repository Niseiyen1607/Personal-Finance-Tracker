const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
