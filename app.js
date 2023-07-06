import express from "express";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import exphbs from "express-handlebars";

import { indexRoutes } from "./routes/index-routes.js";
import { detailsRoutes } from "./routes/details-routes.js";
import { helpers } from "./utils/handlebar-util.js";
import { sessionUserSettings } from "./utils/session-middleware.index.js";

export const app = express();
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "default",
  helpers: {
    ...helpers,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.resolve("views"));


app.use(express.static(path.resolve("public")));
// Todo: use session middleware to memorize user settings like "OrderByName" or filters etc.
app.use(
  session({
    secret: "casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(sessionUserSettings);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Todo: is this the right way to do? Both routers link to the root of the website?
app.use("/", indexRoutes);
app.use("/", detailsRoutes);