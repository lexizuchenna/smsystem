const router = require("express").Router();

const {
  loginUser,

  getRecord,
  fetchStudent,
  getResult,

  registerTeacher,
  fetchTeachers,
  createRecord,

  registerStudent,
  updateStudent,
  fetchStudents,

  getStudents,
  saveResult,
  getResults,
  approveResult,
  rejectResult,
  getRecords,
  getAllResults,
  updateRecord,
  deleteRecord,
} = require("../controllers/api");

const { protect } = require("../middlewares/auth");

router.route("/login").post(loginUser);

// All
router.route("/get-record").get(protect, getRecord);
router.route("/get-records").get(protect, getRecords);
router.route("/get-student/:username").get(protect, fetchStudent);
router.route("/get-result/:username/:session/:term").get(protect, getResult);
router.route("/get-results/:grade/:session/:term").get(protect, getResults);
router
  .route("/get-all-results/:grade/:session/:term")
  .get(protect, getAllResults);

// Admin
router.route("/create-teacher").post(protect, registerTeacher);
router.route("/get-teachers").get(protect, fetchTeachers);
router.route("/create-record").post(protect, createRecord);
router.route("/update-record").post(protect, updateRecord);
router.route("/delete-record").post(protect, deleteRecord);
router.route("/approve-result").post(protect, approveResult);
router.route("/reject-result").post(protect, rejectResult);

// Teachers
router.route("/create-student").post(protect, registerStudent);
router.route("/update-student").post(protect, updateStudent);
router.route("/get-students/:grade/:suffix").get(protect, fetchStudents);

// Sub Teachers
router.route("/get-students/:grade").get(protect, getStudents);
router.route("/save-result").post(protect, saveResult);

module.exports = router;
