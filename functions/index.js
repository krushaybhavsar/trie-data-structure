const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.get("/words", async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("data")
    .doc("words")
    .get();
  const ID = snapshot.id;
  const wordData = snapshot.data();
  res.status(200).send(JSON.stringify({ id: ID, ...wordData }));
});

app.put("/words", async (req, res) => {
  const body = req.body;

  await admin
    .firestore()
    .collection("data")
    .doc("words")
    .update({ ...body });

  res.status(200).send();
});

exports.trie = functions.https.onRequest(app);
