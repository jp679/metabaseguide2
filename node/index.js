const express = require("express");
const jsrsasign = require("jsrsasign");

const PORT = process.env["PORT"] ? parseInt(process.env["PORT"]) : 3001;

// Metabase configuration from your instructions
const METABASE_SITE_URL = "https://charcoal-ferry.metabaseapp.com";
const METABASE_SECRET_KEY = "758281b95fddfa1ac3667eb973291c16eb9000136022d405c8dc82351324db7e";

const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  // Create the payload for the static question embed using jsrsasign
  const jwt = jsrsasign.jws.JWS;
  const URL = METABASE_SITE_URL;
  const key = METABASE_SECRET_KEY;
  const payload = {
    resource: { question: 302 }
  };
  
  // Sign the JWT token using jsrsasign
  const token = jwt.sign("HS256", JSON.stringify({alg: "HS256", typ: "JWT"}), JSON.stringify(payload), key);
  
  // Construct the iframe URL
  const iframeUrl = URL + "/embed/question/" + token + "#bordered=true&titled=true";
  
  // Render the index template with the iframe URL
  res.render("index", { iframeUrl: iframeUrl });
});

app.listen(PORT, () => {
  console.log("Simple Metabase embed app listening on port " + PORT + "!");
});
