const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    session: String,
    term: String,
    "resumption-date": String,
    newsletter: String,
    "open-student": Boolean
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", DataSchema);

module.exports = { DataSchema, Data };
