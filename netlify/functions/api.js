const express = require("express");
const serverless = require("serverless-http");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const api = express();
const router = express.Router();
const API_KEY = process.env.SPOONACULAR_API_KEY;

// Enable CORS
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint to search recipes
router.get("/recipes/complexSearch", async (req, res) => {
  const { query, diet, includeIngredients, maxReadyTime, number = 5 } = req.query;

  if (!query || !diet || !includeIngredients) {
    return res.status(400).json({ error: "Query, diet, and ingredients are required" });
  }

  try {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&includeIngredients=${includeIngredients}&maxReadyTime=${maxReadyTime}&number=${number}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

api.use("/api/", router);

// Start the server if running locally
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 9000;
  api.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports.handler = serverless(api);