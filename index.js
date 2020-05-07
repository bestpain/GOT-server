const express = require("express");
const app = express();
const morgan = require("morgan");
const csv = require("csv-parser");
const cors = require("cors");
require("./db");
const fs = require("fs");
const Battle = require("./model");

app.use(cors())

fs.createReadStream("battles.csv")
  .pipe(csv())
  .on("data", (row) => {
    const battle = new Battle(row);
    battle.save((err, data) => {
      if (err) {
        return "Error while saving data";
      }
    });
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

app.use(morgan("dev"));

const gotRouter=require('./routes/route')
app.use(gotRouter)

app.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});
