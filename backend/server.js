const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Infinite Scroll API is running",
    });
});

app.get("/api/data", (req, res) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
            error: "Page must be a positive integer",
        });
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
        return res.status(400).json({
            error: "Limit must be between 1 and 50",
        });
    }

    const start = (page - 1) * limit + 1;
    const end = start + limit - 1;

    const items = [];

    for (let i = start; i <= end; i++) {
        items.push({
            id: i,
            name: `Item ${i}`,
        });
    }

    res.json({
        page,
        limit,
        items,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});