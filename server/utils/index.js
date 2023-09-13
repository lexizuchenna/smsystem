const jwt = require("jsonwebtoken");
const moment = require("moment")

module.exports = {
  generateToken: (id, expiresIn = "1d") => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn });
  },
  generateNum: (length = 6) => {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  getTotal: (subject) => {
    const total =
      subject.assignment +
      subject["class-work"] +
      subject["mid-term-test"] +
      subject.project +
      subject.exam;

    return total;
  },
  getGrade: (subject) => {
    const total =
      subject.assignment +
      subject["class-work"] +
      subject["mid-term-test"] +
      subject.project +
      subject.exam;

    if (total >= 90) return "A+";

    if (total >= 80) return "A";

    if (total >= 70) return "B";

    if (total >= 60) return "C4";

    if (total >= 50) return "C5";

    if (total >= 40) return "E";

    return "F";
  },

  getAverage: (result) => {
    const totalSub = result.subjects.length;

    // console.log()

    const t = result.subjects.map((sub) => {
      return (
        sub.assignment +
        sub.exam +
        sub["class-work"] +
        sub["mid-term-test"] +
        sub.project
      );
    });

    const total = (arr) => arr.reduce((acc, val) => acc + val, 0);

    return total(t) / totalSub;
  },
  formatDate: (date) => {
    return moment(date, "DD-MM-YYYY").format("DD-MM-YYYY")
  }
};
