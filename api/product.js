const express = require("express");
const router = express.Router();
const database = require("../config/firebase");

database
  .database()
  .ref("/users")
  .on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

router.get("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data has successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
