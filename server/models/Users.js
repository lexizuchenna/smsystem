const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    grade: String,
    suffix: String,
    gender: String,
    role: String,
    grades: [],
    subjects: [],
    subject: String,
    image: String,
    dob: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = { UsersSchema, Users };
