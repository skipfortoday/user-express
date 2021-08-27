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
    db.database()
      .ref("users")
      .orderByChild("id")
      .equalTo(req.params.id)
      .on("value", function (snapshot) {
        let idkey = snapshot.val();
        res.json({
          status: 200,
          message: "This your detail user",
          data: idkey,
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    if (
      req.body.id === undefined ||
      req.body.name === undefined ||
      req.body.jobTitle === undefined ||
      req.body.age === undefined ||
      req.body.location === undefined ||
      req.body.desc === undefined
    )
      res.status(401).json({
        message: "lengkapi parameter anda",
      });
    db.database()
      .ref("/users")
      .push()
      .set({
        id: req.body.id,
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
    if (
      req.body.name === undefined ||
      req.body.jobTitle === undefined ||
      req.body.age === undefined ||
      req.body.location === undefined ||
      req.body.desc === undefined
    )
      res.status(401).json({
        message: "lengkapi parameter anda",
      });
    db.database()
      .ref("users")
      .orderByChild("id")
      .equalTo(req.params.id)
      .on("value", function (snapshot) {
        let idkey = snapshot.val();
        snapshot.forEach(function (data) {
          db.database().ref(`/user/${data.key}`).update({
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            age: req.body.age,
            location: req.body.location,
            desc: req.body.desc,
          });
          res.json({
            status: 200,
            message: "Edited User",
            data: idkey,
          });
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    db.database()
      .ref("users")
      .orderByChild("id")
      .equalTo(req.params.id)
      .on("value", function (snapshot) {
        let idkey = snapshot.val();
        snapshot.forEach(function (data) {
          db.database().ref(`/users/${data.key}`).remove();
          res.json({
            status: 200,
            message: "Deleteduser",
            data: idkey,
          });
        });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
