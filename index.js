const express = require("express");
const app = express();
const users = require("./api/users");
const scan = require("./api/scan");
const cors = require("cors");
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/scan", scan);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
