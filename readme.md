# Product Inquiry Guide Generator

This project utilizes Express.js to create a simple web server that generates buying guides for products based on user queries. It integrates with the OpenAI API to generate content and uses product names extracted from an Excel file to ensure queries are product-related.

## Project Structure

- **index.js**: The main server file. It sets up an Express server that listens for POST requests on the `/search` endpoint. The server expects a product name in the request body and returns a buying guide if the query is product-related.
- **chatGPTAPI.js**: Contains the `getBuyingGuide` function that calls the OpenAI API to generate a detailed buying guide for a specified product. It also includes the `generateProductLinks` function to convert product names in the guide into clickable links.
- **excelUtils.js**: Provides the `readProductNamesFromExcel` function to read product names from an Excel file. This is used to validate if a query is product-related and to replace product names in the buying guide with links.

## Setup

1. **Install Dependencies**: Run `npm install` to install required packages including `express`, `axios`, `xlsx`, and `dotenv`.
2. **Environment Variables**: Create a `.env` file at the root of the project and define the following variables:
   - `PORT`: The port number for the Express server.
   - `OPENAI_API_KEY`: Your OpenAI API key for accessing GPT-3.5.
3. **Excel File**: Ensure you have an Excel file named `products.xlsx` in the project root with product names listed in the first column.

## Usage

1. **Start the Server**: Run `node index.js` to start the Express server.
2. **Making Requests**: Send a POST request to `http://localhost:{PORT}/search` with a JSON body containing the `productName`, e.g., `{"productName": "smartphone"}`.
3. **Receiving the Guide**: The server will respond with a buying guide if the product is recognized, or a message prompting to ask about products otherwise.

## Features

- **Product-Related Query Validation**: Validates incoming queries to ensure they are related to products listed in the Excel file.
- **Dynamic Content Generation**: Leverages OpenAI's GPT-3.5 to generate detailed buying guides that include key features, pros, cons, and recommendations for the specified product.
- **Product Link Enhancement**: Automatically converts product names in the buying guide into clickable links pointing to a predefined website, enhancing the user experience.

## Notes

- The project's effectiveness depends on the quality of the product names listed in the Excel file and the accuracy of the OpenAI API's content generation.
- The `generateProductLinks` function is designed to work with a specific URL structure. Modify it as necessary to match your website's URL schema.