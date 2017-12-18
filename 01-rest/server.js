const express = require("express");

const salad = { avocado: 1, mango: 1, tomato: 0.2, arugula: true, onion: true };
const burger = { buns: 2, shrimp: 1, egg: 1, lettuce: 2.5, mayo: true };
const salads = new Array(100).fill(salad);
const burgers = new Array(100).fill(burger);
const get = (what, count) => what.splice(0, parseInt(count) || 1);

const app = express();
app.get("/salads", ({ query: { count } }, res) => res.json(get(salads, count)));
app.get("/burgers", ({ query: { count } }, res) =>
  res.json(get(burgers, count))
  funky!
);
app.listen(4000);

module.exports = app;
