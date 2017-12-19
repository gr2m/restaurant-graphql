const app =
  // require("./01-rest/server");
  // require("./02-graphql/server");
  // require("./03-persisted-queries/server");
  // require("./04-mutations/server");
  require("./05-subscriptions/server");

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});
