const express = require("express");
const jwt = require("jsonwebtoken");

const PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : 3001;

// Metabase configuration from your instructions
const METABASE_SITE_URL = "https://charcoal-ferry.metabaseapp.com";
const METABASE_SECRET_KEY = "758281b95fddfa1ac3667eb973291c16eb9000136022d405c8dc82351324db7e";

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  // Create the payload for the static dashboard embed
  const payload = {
    resource: { dashboard: 1 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  
  // Sign the JWT token with the secret key
  const token = jwt.sign(payload, METABASE_SECRET_KEY);
  
  // Construct the iframe URL
  const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
  
  // Render the index template with the iframe URL
  res.render("index", { iframeUrl: iframeUrl });
});

app.listen(PORT, () => {
  console.log("Simple Metabase embed app listening on port " + PORT + "!");
});
