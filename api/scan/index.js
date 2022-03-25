const express = require("express");
const router = express.Router();
const db = require("../../config");
const venom = require("venom-bot");
let qrCode = null;

venom
  .create(
    //session
    "sessionName",
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      qrCode = base64Qrimg;
    },
    (statusSession, session) => {
      console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log("Session name: ", session);
    },
    {
      puppeteerOptions: { args: ["--no-sandbox"] }, // Will be passed to puppeteer.launch
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}

// const { Client, LocalAuth } = require("whatsapp-web.js");
// const WwebjsSender = require("@deathabyss/wwebjs-sender");

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// const { Client } = require("whatsapp-web.js");
// const client = new Client();

// client.on("qr", (qr) => {
//   // db.database()
//   //   .ref(`/qrs`)
//   //   .update({ dt: qr })
//   //   .then((e) => console.log({ dt: "asdasdasd" }));
//   qrcode.generate(qr, { small: true });
// });

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// client.on("message", (msg) => {
//   if (msg.body == "!command") {
//     const { from } = msg;
//     console.log(from);
//     let embed = new WwebjsSender.MessageEmbed()
//       .setTitle("✅ | Successful process!")
//       .setDescription("The process has been successful!")
//       .addField("✔", "To confirm")
//       .addField("❌", "To cancel")
//       .addFields({
//         name: "Now you have 2 buttons to   choose!",
//         value: "✔ or ❌",
//       })
//       .setFooter("WwebjsSender")
//       .setTimestamp();

//     let button1 = new WwebjsSender.MessageButton()
//       .setCustomId("confirm")
//       .setLabel("✔");

//     let button2 = new WwebjsSender.MessageButton()
//       .setCustomId("cancel")
//       .setLabel("❌");

//     WwebjsSender.send({
//       client: client,
//       number: from,
//       embed: embed,
//       button: [button1, button2],
//     }).then((e) => console.log(e).catch((e) => console.log(e)));
//   }
// });

// client.initialize();

// const makeWASocket, { makeInMemoryStore } require ("@adiwajshing/baileys");
// // the store maintains the data of the WA connection in memory
// // can be written out to a file & read from it
// const store = makeInMemoryStore({});
// // can be read from a file
// store.readFromFile("./baileys_store.json");
// // saves the state to a file every 10s
// setInterval(() => {
//   store.writeToFile("./baileys_store.json");
// }, 10_000);

// const sock = makeWASocket({});
// // will listen from this socket
// // the store can listen from a new socket once the current socket outlives its lifetime
// store.bind(sock.ev);

// sock.ev.on("chats.set", () => {
//   // can use "store.chats" however you want, even after the socket dies out
//   // "chats" => a KeyedDB instance
//   console.log("got chats", store.chats.all());
// });

// sock.ev.on("contacts.set", () => {
//   console.log("got contacts", Object.values(store.contacts));
// });

router.get("/", async (req, res) => {
  try {
    res.send(qrCode);
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
    console.log(req.body, "ini req body post");
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
    // db.database()
    //   .ref(`/qrs`)
    //   .update("asdasdasdasd")
    //   .then((e) => res.send("asdasdasd"));
    //             name: req.body.name,
    //             jobTitle: req.body.jobTitle,
    //             age: req.body.age,
    //             location: req.body.location,
    //             desc: req.body.desc,
    //           });
    // client
    //   .sendMessage(
    //     "6281330349506@c.us",
    //     `Hai user 👤 dengan id : ${req.body.data.pin} telah scan 🏫 ${
    //       req.body.data.status_scan == 1 ? "Masuk" : "Pulang"
    //     } pada ${req.body.data.scan} dari mesin 📠 ${req.body.cloud_id}`
    //   )
    //   .then((e) => res.send("hhh"));
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
