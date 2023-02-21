//require framework
const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
// require template engine
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//setting static data
app.use(express.static("public"));

const methodOverrid = require("method-override");
app.use(methodOverrid("_method"));

require("./config/mongoose");
// body-parser
app.use(express.urlencoded({ extended: true }));
//handling route
app.use(routes);

// listen server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
