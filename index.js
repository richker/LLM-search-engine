require("dotenv").config();
const express = require("express");
const { getBuyingGuide } = require("./utils/chatGPTAPI");
const { readProductNamesFromExcel } = require("./utils/excelUtils");

const productNames = readProductNamesFromExcel("./products.xlsx");

// Utility function to check if a query seems to be about a product
function isProductRelatedQuery(query) {
  // Convert query to lowercase for case-insensitive comparison
  const queryLower = query.toLowerCase();
  // Check if query includes any product name
  return productNames.some((name) => queryLower.includes(name.toLowerCase()));
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/search", async (req, res) => {
  const { productName } = req.body;
  if (!productName) {
    return res.status(400).send({ message: "Product name is required" });
  }

  if (!isProductRelatedQuery(productName)) {
    return res.status(200).send({
      message: "We specialize in product inquiries. Please ask about products.",
    });
  }

  const guide = await getBuyingGuide(productName);
  if (!guide) {
    return res.status(404).send({ message: "Couldn't fetch buying guide" });
  }

  res.status(200).send({ guide });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
