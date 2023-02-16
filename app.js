//require framework
const express = require("express");
const app = express();
const port = 3000;
// require template engine
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//setting static data
app.use(express.static("public"));
//handling route
app.get("/", (req, res) => {
  res.render("index");
});

// listen server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
