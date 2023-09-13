const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {type: String},
    token: {
      type: Object,
      default: { useCount: 0, pin: "" },
    },
    term: String,
    session: String,
    subjects: [],
    f_message: String,
    a_reject: { type: Boolean, default: false },
    a_approve: { type: Boolean, default: false },
    f_approve: { type: Boolean, default: false },
    grade: String,
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", ResultSchema);

module.exports = { ResultSchema, Result };
