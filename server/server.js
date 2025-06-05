const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/server/assets', express.static(path.join(__dirname, '../server/assets/')));
// Path to the vegetables.js file
const dataFilePath = path.join(__dirname, "../server/data/vegetables.js");
console.log("Data file path:", dataFilePath);

// Load vegetables data from file
let vegetables = require(dataFilePath);
console.log("Initial vegetables data:", vegetables);

// Helper function to save vegetables to file
function saveVegetablesToFile() {
  const dataToWrite = `const vegetables = ${JSON.stringify(vegetables, null, 2)};\n\nexport default vegetables;`;

  fs.writeFile(dataFilePath, dataToWrite, (err) => {
    if (err) {
      console.error("Failed to save vegetables data:", err);
    } else {
      console.log("Vegetables data saved successfully");
    }
  });
}

// GET all vegetables
app.get("/api/vegetables", (req, res) => {
  res.send( vegetables );
});

// POST add or update vegetable
app.post("/api/vegetables", (req, res) => {
  const newVeg = req.body;

  if (
    !newVeg ||
    !newVeg.name?.en ||
    typeof newVeg.price !== "number" ||
    !newVeg.delivery_time
  ) {
    return res.status(400).json({ message: "Missing required vegetable fields" });
  }
  console.log("Received vegetable data:", vegetables);
  // Check if vegetable with same English name exists
  vegetables = vegetables.default || vegetables; // Ensure we are working with an array
  const index = vegetables.findIndex(
    (veg) => veg.name.en.toLowerCase() === newVeg.name.en.toLowerCase()
  );

  if (index !== -1) {
    // Update existing
    vegetables[index] = { ...vegetables[index], ...newVeg };
  } else {
    // Add new - generate unique id (timestamp)
    const id = Date.now();
    vegetables.push({ id, ...newVeg });
  }

  saveVegetablesToFile();

  res.json({ message: "Vegetable added/updated successfully", vegetables });
});

// DELETE vegetable by id
app.delete("/api/vegetables/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = vegetables.findIndex((veg) => veg.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Vegetable not found" });
  }

  vegetables.splice(index, 1);

  saveVegetablesToFile();

  res.json({ message: "Vegetable deleted successfully", vegetables });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
