const express = require('express');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const PORT = 5000;

app.get('/excel/preprocessing', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, 'data', 'data_final.xlsx');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        res.json({
            status: 'success',
            data: jsonData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

app.get('/excel/processing', (req, res) => {
    try {
        const filePath = path.resolve(__dirname, 'data', 'data.xlsx');
        const workbook = xlsx.readFile(filePath);

        // Ensure there is a second sheet
        if (workbook.SheetNames.length < 2) {
            return res.status(404).json({
                status: 'error',
                message: 'Second sheet not found in the Excel file.',
            });
        }

        const sheetName = workbook.SheetNames[1]; // Fetch the second sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        res.json({
            status: 'success',
            data: jsonData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
