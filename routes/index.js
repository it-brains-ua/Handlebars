const express = require("express");
const router = express.Router();
const hbs = require("hbs");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", style: "app.css" });
});

router.get("/templates", function (req, res, next) {
  res.render("1-templates", { title: "Templates", name: "Sabe" });
});

router.get("/embeddedness", function (req, res, next) {
  res.render("2-embeddedness", {
    title: "Embeddedness",
    person: {
      firstname: "Yehuda",
      lastname: "Katz",
    },
  });
});

router.get("/context", function (req, res, next) {
  res.render("3-context", {
    title: "Context",
    person: {
      firstname: "Yehuda",
      lastname: "Katz",
    },
  });
});

router.get("/loop", function (req, res, next) {
  res.render("4-loop", {
    title: "Loop",
    people: ["Yehuda Katz", "Alan Johnson", "Charles Jolley"],
  });
});

router.get("/comments", function (req, res, next) {
  res.render("5-comments", {
    title: "Comments",
    name: "Sabe",
  });
});

router.get("/helper", function (req, res, next) {
  hbs.registerHelper("print_person", function () {
    return this.firstname + " " + this.lastname;
  });

  hbs.registerHelper("loud", function (aString) {
    return aString.toUpperCase();
  });
  res.render("6-helper", {
    title: "Helper",
    firstname: "Yehuda",
    lastname: "Katz",
    people: [
      {
        firstname: "Nils",
        lastname: "Knappmeier",
      },
      {
        firstname: "Yehuda",
        lastname: "Katz",
      },
    ],
  });
});

router.get("/block-helper", function (req, res, next) {
  hbs.registerHelper("list", function (items, options) {
    const itemsAsHtml = items.map(
      (item) => "<li>" + options.fn(item) + "</li>"
    );
    return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
  });
  res.render("7-blockHelper", {
    title: "Block Helper",
    people: [
      {
        firstname: "Yehuda",
        lastname: "Katz",
      },
      {
        firstname: "Carl",
        lastname: "Lerche",
      },
      {
        firstname: "Alan",
        lastname: "Johnson",
      },
    ],
  });
});

router.get("/partials", function (req, res, next) {
  hbs.registerPartial(
    "person",
    "{{person.name}} is {{person.age}} years old.\n"
  );

  res.render("8-partials", {
    title: "Partials",
    persons: [
      { name: "Nils", age: 20 },
      { name: "Teddy", age: 10 },
      { name: "Nelson", age: 40 },
    ],
  });
});

module.exports = router;
