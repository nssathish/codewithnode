const express = require("express");
const app = express();
const router = express.Router();

// router.get("", (req, res) => { // This also works
router.get("/", (req, res) => {
  res.render("index", {
    title: "My Express App",
    message: "Hello from home controller"
  });
});

module.exports = router;
