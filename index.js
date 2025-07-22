require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { StreamClient } = require("@stream-io/node-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  console.error(
    "Missing STREAM_API_KEY or STREAM_API_SECRET in environment variables."
  );
  process.exit(1);
}

const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

app.use(bodyParser.json());

// Placeholder endpoint for generating a GetStream video call token
app.post("/getstream/token", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    // Optionally, you can set validity_in_seconds (default: 1 hour)
    const validity = 60 * 60; // 1 hour
    const token = streamClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: validity,
    });
    return res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
