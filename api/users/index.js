const express = require("express");
const router = express.Router();
const db = require("../../config");

router.get("/", async (req, res) => {
  try {
    db.database()
      .ref("/users")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        res.json({
          status: 200,
          message: "Get data has successfully",
          data: data,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    db.database()
      .ref(`users/${req.params.id}`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        res.json({
          status: 200,
          message: "This your detyail users ",
          data: data,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    db.database()
      .ref("/users")
      .push()
      .set({
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        age: req.body.age,
        location: req.body.location,
        desc: req.body.desc,
      })
      .then(() =>
        res.json({ status: 200, message: "POST data has successfully" })
      );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    db.database().ref(`/user/${req.params.id}`).update({
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      age: req.body.age,
      location: req.body.location,
      desc: req.body.desc,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    firebase.database().ref(`/user/${req.params.id}`).remove();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
