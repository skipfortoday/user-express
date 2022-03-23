const express = require("express");
const router = express.Router();
const db = require("../../config");

const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

// const { Client } = require("whatsapp-web.js");
// const client = new Client();

client.on("qr", (qr) => {
  db.database()
    .ref("/qrs")
    .push()
    .set(qr)
    .then(() => console.log("POST data has successfully"));
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

// client.on("message", (message) => {
//   console.log(message);

//   if (message.body === "co-1") {
//     message.reply(`Hai Saya bot kamu memilih 1`);
//   } else if (message.body === "co-2") {
//     message.reply(`Hai Saya bot kamu memilih 2`);
//   } else {
//     message.reply(`
//     Selamat Datang Di BOT Rizqi
//     Berikut Adalah List Perintah yang tersedia :
//     1. "co-1" test 1
//     2. "co-2" test2
//     `);
//   }
// });

client.initialize();

router.get("/", async (req, res) => {
  try {
    client
      .sendMessage("6281330349506@c.us", "Hai server whatsapp menyala")
      .then((e) => res.send(e));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     db.database()
//       .ref("users")
//       .orderByChild("id")
//       .equalTo(req.params.id)
//       .on("value", function (snapshot) {
//         let idkey = snapshot.val();
//         res.json({
//           status: 200,
//           message: "This your detail user",
//           data: idkey,
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server error");
//   }
// });

router.post("/", async (req, res) => {
  try {
    //{"type":"attlog", "cloud_id":"XXXXXX", "data":{"pin":"1", "scan":"2020-07-21 10:11", "verify":"1", "status_scan":"1"}}
    // if (
    //   req.body.id === undefined ||
    //   req.body.name === undefined ||
    //   req.body.jobTitle === undefined ||
    //   req.body.age === undefined ||
    //   req.body.location === undefined ||
    //   req.body.desc === undefined
    // )
    //   res.status(401).json({
    //     message: "lengkapi parameter anda",
    //   });

    client
      .sendMessage(
        "6281330349506@c.us",
        `Hai user 👤 dengan id : ${req.body.data.pin} telah scan 🏫 ${
          req.body.data.status_scan == 1 ? "Masuk" : "Pulang"
        } pada ${req.body.data.scan} dari mesin 📠 ${req.body.cloud_id}`
      )
      .then((e) => res.send(e));
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     if (
//       req.body.name === undefined ||
//       req.body.jobTitle === undefined ||
//       req.body.age === undefined ||
//       req.body.location === undefined ||
//       req.body.desc === undefined
//     )
//       res.status(401).json({
//         message: "lengkapi parameter anda",
//       });
//     db.database()
//       .ref("users")
//       .orderByChild("id")
//       .equalTo(req.params.id)
//       .on("value", function (snapshot) {
//         let idkey = snapshot.val();
//         snapshot.forEach(function (data) {
//           db.database().ref(`/users/${data.key}`).update({
//             name: req.body.name,
//             jobTitle: req.body.jobTitle,
//             age: req.body.age,
//             location: req.body.location,
//             desc: req.body.desc,
//           });
//           res.json({
//             status: 200,
//             message: "Edited User",
//             data: idkey,
//           });
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server error");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     db.database()
//       .ref("users")
//       .orderByChild("id")
//       .equalTo(req.params.id)
//       .on("value", function (snapshot) {
//         let idkey = snapshot.val();
//         snapshot.forEach(function (data) {
//           db.database().ref(`/users/${data.key}`).remove();
//           res.json({
//             status: 200,
//             message: "Deleteduser",
//             data: idkey,
//           });
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server error");
//   }
// });

module.exports = router;
