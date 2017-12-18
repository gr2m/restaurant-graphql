const { readFileSync } = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const persistedQueries = require("./persisted-queries");

const salad = { avocado: 1, mango: 1, tomato: 0.2, arugula: true, onion: true };
const burger = { buns: 2, shrimp: 1, egg: 1, lettuce: 2.5, mayo: true };
const salads = new Array(100).fill(salad);
const burgers = new Array(100).fill(burger);
const get = (what, count) => what.splice(0, parseInt(count) || 1);

const schema = makeExecutableSchema({
  typeDefs: readFileSync("03-persisted-queries/schema.graphql", "utf8"),
  resolvers: {
    Query: {
      salads: (_, { count }) => get(salads, count),
      burgers: (_, { count }) => get(burgers, count)
    }
  }
});

const app = express();
app.get("/salads", ({ query: { count } }, res) => res.json(get(salads, count)));
app.get("/burgers", ({ query: { count } }, res) =>
  res.json(get(burgers, count))
);
app.use("/graphql", bodyParser.json(), (req, res, next) => {
  if (persistedQueries[req.body.id]) {
    req.body.query = persistedQueries[req.body.id];
  }
  next();
});
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.listen(4000);

module.exports = app;
