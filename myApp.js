let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const logger = (req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
}

app.use(logger);

app.use(bodyParser.urlencoded({extended: false}));

app.use(
  "/public",express.static(__dirname + "/public")
);

app.get("/", (req, res) => {
  //res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase" ? res.json({"message": "HELLO JSON"}) : res.json({"message": "Hello json"});
});

app.get("/now", (req, res , next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json(
    {time: req.time})
});

app.get("/:word/echo", (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
  res.json({name: req.query.first + " " + req.query.last});
});

app.post("/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last});
});
























 module.exports = app;
