// Import required modules
const { json } = require("body-parser");
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Ensure you have installed axios: npm install axios

const dotnenv = require("dotenv");

dotnenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const AstraToken = process.env.AstraToken;
const LangflowUrl = process.env.LangflowUrl;
// Define the fetch options
const payload = {
  input_value: "https://github.com/PrashantDhuri08/Portfolio.git",
  output_type: "chat",
  input_type: "chat",
  session_id: "user_1",
};

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + AstraToken,
  },
};

// Define route to fetch data and send response
app.post("/", async (req, res) => {
  try {
    // Extract input_value from the request body
    const { input_value } = req.body;

    // Update the payload with the input_value from the request
    const updatedPayload = {
      ...payload,
      input_value: input_value,
    };

    // Make the POST request using axios
    const fetchResponse = await axios.post(
      LangflowUrl,
      updatedPayload,
      options
    );

    const responseData = fetchResponse.data;
    res.status(200).json(responseData); // Respond with the fetched data
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch data. Please try again later." });
  }
});

// Set the server to listen on a specific port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
