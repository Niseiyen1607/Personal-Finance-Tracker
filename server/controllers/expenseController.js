const Expense = require("../models/Expense");

// @desc    Récupérer toutes les dépenses
// @route   GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Créer une dépense
// @route   POST /api/expenses
exports.createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Supprimer une dépense
// @route   DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json("Dépense supprimée");
  } catch (err) {
    res.status(500).json(err);
  }
};
