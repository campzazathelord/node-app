const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// different paths
const publicDirectoryPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");
console.log("dsa");
app.use(express.static(publicDirectoryPath));
//setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// get
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Camp Campp",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rapeekorn Boonribsong",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rapeekorn Boonribsong",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address provided",
    });
  }
  geocode.addressViaCountry(
    req.query.address,
    (error, { Long, Lat, Location: Location1 } = {}) => {
      if (!error) {
        forecast.forecast(
          Long,
          Lat,
          Location1,
          (error, { temperature, feelslike, location } = {}) => {
            res.send({
              temperature,
              feelslike,
              location,
            });
          }
        );
      } else {
        res.send({
          temperature: "error",
          feelslike: "error",
          location: "error",
        });
      }
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("notfound", {
    notfound: "Help article not found",
    name: "Rapeekorn Boonribsong",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    notfound: "Error 404",
    name: "Rapeekorn Boonribsong",
  });
});
// required!
app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
