import Income from "../models/Income.js";
import xlsx from "xlsx";


export const addIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const income = await Income.create({ userId, icon, source, amount, date: new Date(date) });

        res.status(201).json({ message: "Income added successfully", income });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try{
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}