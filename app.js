const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Camp-Utopia");
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampgroud", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    description: "cheap camping!",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
