import Expense from "../models/Expense.js";
import xlsx from "xlsx";

export const addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount, date } = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({ message: "All fields are required" });
        }

        const expense = await Expense.create({ userId, icon, category, amount, date: new Date(date) });

        await expense.save();
        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
}
}

export const getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);    
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    
    try{
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        
        const data = expenses.map((item) => ({
            category: item.category,
            amount: item.amount,
            date: item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}