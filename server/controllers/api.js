const bcrypt = require("bcryptjs");

const { Users } = require("../models/Users");
const { Data } = require("../models/Data");
const { Result } = require("../models/Results");
const { generateToken, generateNum } = require("../utils");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);

      const user = await Users.findOne({ username });

      if (!user) {
        return res.status(404).json("User Not Found");
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(400).json("Incorrect Password");
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        role: user.role,
        id: user._id,
        name: user.name,
        username: user.username,
        grade: user.grade ? user.grade : null,
        suffix: user.suffix ? user.suffix : null,
        grades: user.grades,
        subjects: user.subjects,
        subject: user.subject,
        image: user?.image,
        dob: user?.dob,
        token,
      });
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },

  // All
  getRecord: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json("Not Authorized");
      }

      const record = await Data.findOne().sort({ session: -1, term: -1 });

      return res.status(200).json(record);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  getRecords: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json("Not Authorized");
      }

      const records = await Data.find().sort({ session: 1 });

      const mappedRecords = records.map((record) => record.session);

      const setRecords = [...new Set(mappedRecords)];

      return res.status(200).json(setRecords);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  getResult: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json("Not Authorized");
      }

      const { username, term, session } = req.params;

      const user = await Users.findOne({ username });

      if (!user) {
        res.status(400).json("Invalid Student");
      }

      const result = await Result.findOne({ username, term, session });

      if (result) {
        return res.status(200).json(result);
      }

      const newResult = await Result.create({
        ...req.params,
        grade: user.grade,
        name: user.name,
      });

      return res.status(200).json(newResult);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  approveResult: async (req, res) => {
    try {
      const { role } = req.user;
      const { username, session, term, result } = req.body;

      if (role === "admin") {
        const token = {
          useCount: 0,
          pin: generateNum(12),
        };

        const updated = { ...result, token };

        await Result.findOneAndUpdate({ username, session, term }, updated);

        return res.status(200).json("Result Approved");
      }

      if (role === "form-teacher") {
        console.log(result.f_approve);
        await Result.findOneAndUpdate({ username, session, term }, result);

        return res.status(200).json("Result Sent For Approval");
      }

      return res.status(400).json("Not Authorized");
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  rejectResult: async (req, res) => {
    try {
      if (req.user.role === "sub-teacher") {
        return res.status(400).json("Not Authorized");
      }

      const { username, session, term, result } = req.body;

      await Result.findOneAndUpdate({ username, session, term }, result);

      return res.status(200).json("Result Rejected");
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error.message);
    }
  },

  // Admin
  registerTeacher: async (req, res) => {
    try {
      const { username, password, name, grade, suffix } = req.body;

      if (req.user.role !== "admin") {
        return res.status(400).json("Not Authorized");
      }

      if (req.body.role === "form-teacher") {
        const isGrade = await Users.findOne({ grade, suffix });

        if (isGrade) {
          console.log("grade", isGrade);
          return res.status(400).json("Grade Already Assigned");
        }
      }

      const isUser = await Users.findOne({ username });

      if (isUser) {
        console.log("user", isUser);
        return res.status(400).json("Username Taken");
      }

      const salt = await bcrypt.genSalt();

      const hashedPwd = await bcrypt.hash(password, salt);

      await Users.create({ ...req.body, password: hashedPwd });

      return res.status(200).json(`${name} Created Successfully`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  fetchTeachers: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json("Not Authorized");
      }

      const subTeachers = await Users.find({ role: "sub-teacher" }).select(
        "-password"
      );
      const formTeachers = await Users.find({ role: "form-teacher" }).select(
        "-password"
      );

      return res.status(200).json({ subTeachers, formTeachers });
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  createRecord: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json("Not Authorized");
      }

      const { term, session } = req.body;

      const record = await Data.findOne({ term, session });

      if (record) return res.status(400).json("Session and Term exists");

      await Data.create({...req.body, "open-student": false});

      return res
        .status(200)
        .json(`${session}_${term} Term created Successfuly`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  updateRecord: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json("Not Authorized");
      }

      const { _id: id } = req.body;

      await Data.findByIdAndUpdate(id, { ...req.body });

      return res.status(200).json(`Record updated successfuly`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  deleteRecord: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json("Not Authorized");
      }

      const { id } = req.body;

      await Data.findByIdAndRemove(id);

      return res.status(200).json(`Record deleted successfuly`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  getAllResults: async (req, res) => {
    try {
      if (req.user.role !== "admin")
        return res.status(400).json("Not Authorized");

      const { grade, term, session } = req.params;

      const results = await Result.find({
        grade,
        term,
        session,
        a_approve: true,
      });

      return res.status(200).json(results);
    } catch (error) {
      console.log("api", error.message);
      return res.status(500).json(error.message);
    }
  },

  // Form Teachers
  registerStudent: async (req, res) => {
    try {
      const { password, name } = req.body;

      const generateUsername = async () => {
        let user = `student${generateNum()}`;
        let username = await Users.findOne({ username: user });

        while (username) {
          user = `student${generateNum(6)}`;
          username = await Users.findOne({ username: user });
        }

        return user;
      };

      if (req.user.role !== "form-teacher") {
        return res.status(400).json("Not Authorized");
      }

      const salt = await bcrypt.genSalt();

      const hashedPwd = await bcrypt.hash(password, salt);

      await Users.create({
        ...req.body,
        password: hashedPwd,
        username: await generateUsername(),
      });

      return res.status(200).json(`${name} Created Successfully`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  updateStudent: async (req, res) => {
    try {
      const { username, name } = req.body;

      if (req.user.role !== "form-teacher") {
        return res.status(400).json("Not Authorized");
      }

      const user = await Users.findOneAndUpdate(
        { username },
        {
          ...req.body,
        }
      );

      if (!user) {
        return res.status(400).json("Student Not found");
      }

      return res.status(200).json(`${name} Updated Successfully`);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  fetchStudents: async (req, res) => {
    const { role } = req.user;

    try {
      if (role === "form-teacher" || role === "admin") {
        const { grade, suffix } = req.params;

        const students = await Users.find({
          role: "student",
          grade,
          suffix,
        }).select("-password");

        return res.status(200).json(students);
      }

      return res.status(400).json("Not Authorized");
    } catch (error) {
      console.log("error", error.message);
      return res.status(500).json(error.message);
    }
  },
  fetchStudent: async (req, res) => {
    try {
      if (req.user) {
        const { username } = req.params;

        const student = await Users.findOne({
          username,
        }).select("-password -_id -createdAt -updatedAt -grades -role -__v");

        return res.status(200).json(student);
      }

      return res.status(400).json("Not Authorized");
    } catch (error) {
      console.log("error", error.message);
      return res.status(500).json(error.message);
    }
  },
  getResults: async (req, res) => {
    try {
      if (req.user.role === "form-teacher") {
        const { grade, term, session } = req.params;

        const results = await Result.find({ grade, term, session });

        return res.status(200).json(results);
      }

      if (req.user.role === "admin") {
        const { grade, term, session } = req.params;

        const results = await Result.find({
          grade,
          term,
          session,
          f_approve: true,
          a_approve: false,
        });

        return res.status(200).json(results);
      }

      return res.status(400).json("Not Authorized");
    } catch (error) {
      console.log("error", error.message);
      return res.status(500).json(error.message);
    }
  },

  // Sub Teachers
  getStudents: async (req, res) => {
    try {
      if (req.user.role !== "sub-teacher") {
        return res.status(400).json("Not Authorized");
      }

      const { grade } = req.params;

      const students = await Users.find({
        grade,
        role: "student",
        subjects: { $in: [req.user.subject] },
      });

      const { session, term } = await Data.findOne().sort({
        session: -1,
        term: -1,
      });

      const result = students.map(async (s) => {
        const res = await Result.findOne({
          session,
          term,
          username: s.username,
        });
        return res;
      });

      console.log(result);

      // getRes()
      // console.log();
      // console.log({session, term, username: s.username});
      // console.log(res)
      // result.push(res);

      // console.log(data)

      return res.status(200).json(students);
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
  saveResult: async (req, res) => {
    try {
      if (req.user.role !== "sub-teacher") {
        return res.status(400).json("Not Authorized");
      }

      const { username, data, term, session } = req.body;

      const result = await Result.findOne({
        username,
        term,
        session,
      });

      if (!result) {
        return res.status(400).json("Result Not Found");
      }

      const index = result.subjects.findIndex(
        (subject) => subject.title === req.user.subject
      );

      if (index === -1) {
        const newResult = [...result.subjects, { ...data, approved: false }];
        await Result.findOneAndUpdate(
          {
            username,
            term,
            session,
          },
          { subjects: newResult }
        );

        return res.status(200).json("Result Saved");
      } else {
        result.subjects[index] = data;
        await Result.findOneAndUpdate(
          {
            username,
            term,
            session,
          },
          { subjects: result.subjects }
        );

        if (result.subjects[index].approved) {
          return res.status(200).json("Sent for approval");
        } else {
          return res.status(200).json("Result Saved");
        }
      }
    } catch (error) {
      console.log("error", error.message);
      res.status(500).json(error.message);
    }
  },
};
