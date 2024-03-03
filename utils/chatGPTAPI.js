require("dotenv").config();
const axios = require("axios");
const { readProductNamesFromExcel } = require("./excelUtils");

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = "https://api.openai.com/v1/chat/completions";
const productNames = readProductNamesFromExcel("./products.xlsx");

async function getBuyingGuide(productName) {
    try {
        const response = await axios.post(BASE_URL, {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful assistant."
            }, {
                role: "user",
                content: `Generate a detailed buying guide for ${productName}, including key features, pros, cons, and recommendations.`
            }],
        }, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
        });

        if (response.data.choices && response.data.choices.length > 0) {
            let guideText = response.data.choices[0].message.content;
            guideText = generateProductLinks(guideText);
            return guideText;
        }
    } catch (error) {
        console.error("Error fetching buying guide:", error);
        return "We encountered an error generating the buying guide. Please try again later.";
    }
}

function generateProductLinks(guideText) {
    productNames.forEach(product => {
        const regex = new RegExp(`\\b${product}\\b`, "gi");
        guideText = guideText.replace(regex, (match) => {
            const link = `https://www.10bestdeals.co.uk/product/${encodeURIComponent(match.toLowerCase().replace(/\s+/g, '-'))}/`;
            return `[${match}](${link})`
        });
    });

    return guideText;
}

module.exports = { getBuyingGuide };
