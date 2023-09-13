const { Result } = require("../models/Results");
const { Users } = require("../models/Users");

module.exports = {
  viewResult: async (req, res) => {
    try {
      const { username, session, term } = req.query;

      if (!username || !session || !term)
        return res.status(400).json("Invalid Query");

      const { role } = req.user;

      const result = await Result.findOne({ username, session, term }).lean();
      const user = await Users.findOne({ username }).lean();

      if (role === "student") {
        const { pin } = req.query;
        const { pin: pin1, useCount } = result.token;

        if (pin1 !== pin) return res.status(400).json("Invalid Token");
        if (useCount >= 5) return res.status(400).json("Token Usage Exceeded");

        const newToken = {
          useCount: useCount + 1,
          pin: pin1,
        };

        await Result.findOneAndUpdate(
          { username, session, term },
          { token: newToken }
        );
      }
      return res.status(200).render("result", { result, user });
    } catch (error) {
      console.log("result", error.message);
      return res.status(500).json(error.message);
    }
  },
  checkResult: async (req, res) => {
    try {
      const { username, session, term } = req.query;

      if (!username || !session || !term)
        return res.status(400).json("Invalid Query");

      const { role } = req.user;

      const result = await Result.findOne(req.query).lean();

      if (role === "student") {
        if (!result) return res.status(400).json("Result not available");

        const isVerified = result.a_approve;

        if (!isVerified) return res.status(400).json("Result not available");

        return res.status(200).json("Verified");
      }
    } catch (error) {
      console.log("result", error.message);
      return res.status(500).json(error.message);
    }
  },
};
