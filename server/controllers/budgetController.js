const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// @desc    Récupérer tous les budgets
// @route   GET /api/budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @desc    Créer un budget
// @route   POST /api/budgets
exports.createBudget = async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json(err);
  }
};

// @desc    Supprimer un budget et ses dépenses
// @route   DELETE /api/budgets/:id
exports.deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    // Supprimer aussi les dépenses associées (Important !)
    await Expense.deleteMany({ budgetId: req.params.id });
    res.status(200).json("Budget et dépenses supprimés");
  } catch (err) {
    res.status(500).json(err);
  }
};
