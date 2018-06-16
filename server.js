let express = require("express");
let bodyParser = require("body-parser");

// EXPRESS CONFIGURATION
let app = express();

let PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// ROUTES
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER

app.listen(PORT, function() {
  console.log("App listening on PORT:http://localhost:" + PORT);
});
