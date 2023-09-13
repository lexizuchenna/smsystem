export const toastObject = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
};

export const routes = {
  admin: [
    { link: "#", icon: "", text: "Admin" },
    { link: "/admin/dashboard", icon: "ni ni-app", text: "Dashboard" },
    { link: "#", icon: "", text: "Teachers" },
    { link: "/admin/create-teacher", icon: "ni ni-app", text: "New Teacher" },
    { link: "/admin/teachers", icon: "ni ni-app", text: "View Teachers" },
    { link: "#", icon: "", text: "Results" },
    { link: "/admin/select-grade", icon: "ni ni-app", text: "Results" },
    { link: "/admin/all-results", icon: "ni ni-app", text: "All Results" },
    { link: "#", icon: "", text: "Sessions" },
    { link: "/admin/create-session", icon: "ni ni-app", text: "Create Session" },
    { link: "/admin/sessions", icon: "ni ni-app", text: "View Sessions" },
  ],
  "form-teacher": [
    { link: "#", icon: "", text: "Teacher" },
    { link: "/form-teacher/dashboard", icon: "ni ni-app", text: "Dashboard" },
    {
      link: "/form-teacher/create-student",
      icon: "ni ni-app",
      text: "New Student",
    },
    {
      link: "/form-teacher/view-students",
      icon: "ni ni-app",
      text: "Students",
    },
    { link: "#", icon: "ni ", text: "Results" },
    { link: "/form-teacher/results", icon: "ni ", text: "Results" },
  ],
  "sub-teacher": [
    { link: "#", icon: "", text: "Subject Teacher" },
    { link: "/sub-teacher/dashboard", icon: "ni ni-app", text: "Dashboard" },
    { link: "#", icon: "", text: "Results" },
    { link: "/sub-teacher/create-result", icon: "ni ni-app", text: "Create Results" },
  ],
  student: [
    { link: "#", icon: "", text: "Students" },
    { link: "/student/dashboard", icon: "ni ni-app", text: "Dashboard" },
    { link: "#", icon: "ni ", text: "Results" },
    { link: "/student/result", icon: "ni ni-app", text: "Results" },
    { link: "/student/newsletter", icon: "ni ni-app", text: "Newsletters" },
  ],
};

export const termOptions = [
  { value: "default", text: "Select Term" },
  { value: "1st", text: "1st Term" },
  { value: "2nd", text: "2nd Term" },
  { value: "3rd", text: "3rd Term" },
];
export const sessionOptions = [
  { value: "default", text: "Select Session" },
  { value: "2022-2023", text: "2022-2023" },
  { value: "2023-2024", text: "2023-2024" },
  { value: "2024-2025", text: "2024-2025" },
  { value: "2025-2026", text: "2025-2026" },
  { value: "2026-2027", text: "2026-2027" },
  { value: "2027-2028", text: "2027-2028" },
  { value: "2028-2029", text: "2028-2029" },
  { value: "2029-2030", text: "2029-2030" },
];

export const juniors = [
  { checked: false, text: "English", name: "english" },
  { checked: false, text: "Mathematics", name: "mathematics" },
  { checked: false, text: "C.R.S", name: "crs" },
  { checked: false, text: "French", name: "french" },
  { checked: false, text: "Business Studies", name: "business-studies" },
  { checked: false, text: "History", name: "history" },
  { checked: false, text: "I.C.T", name: "ict" },
  { checked: false, text: "Home Economics", name: "home-economics" },
  { checked: false, text: "Basic Science", name: "basic-science" },
  { checked: false, text: "C.C.A", name: "cca" },
  { checked: false, text: "Basic Tech", name: "basic-tech" },
  { checked: false, text: "Civic Education", name: "civic-education" },
  {
    checked: false,
    text: "Agricultural Sci",
    name: "agricultural-sci",
  },
  { checked: false, text: "Social Studies", name: "social-studies" },
  { checked: false, text: "Igbo", name: "Igbo" },
  { checked: false, text: "P.H.E", name: "phe" },
];

export const seniors = [
  { checked: false, text: "English", name: "english" },
  { checked: false, text: "Mathematics", name: "mathematics" },
  { checked: false, text: "Food/Nutrition", name: "food-nutrition" },
  { checked: false, text: "Civic Education", name: "civic-education" },
  { checked: false, text: "Chemistry", name: "chemistry" },
  { checked: false, text: "Physics", name: "physics" },
  { checked: false, text: "Biology", name: "biology" },
  { checked: false, text: "I.C.T", name: "ict" },
  { checked: false, text: "Literature", name: "Literature" },
  { checked: false, text: "C.R.S", name: "crs" },
  { checked: false, text: "Tourism", name: "mourism" },
  { checked: false, text: "Music", name: "music" },
  { checked: false, text: "Government", name: "government" },
  { checked: false, text: "Igbo", name: "Igbo" },
  { checked: false, text: "Marketing", name: "marketing" },
  { checked: false, text: "Fin/Acct", name: "fin-acct" },
  { checked: false, text: "Agric", name: "agric" },
  { checked: false, text: "Economics", name: "economics" },
];
