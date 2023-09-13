import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import CreateStudent from "./CreateStudent";
import ViewStudents from "./ViewStudents";
import ViewStudent from "./ViewStudent";
import Results from "./Results";
import ViewResults from "./ViewResults";
import ViewResult from "./ViewResult";

import { auth } from "../../features/selectors";

function FormTeacher({ setIsLoading }) {
  const navigate = useNavigate();

  // Annabel123

  const { authData } = useSelector(auth);

  useEffect(() => {
    if (authData && authData.role !== "form-teacher") {
      return navigate(`/${authData.role}/dashboard`);
    }

    if (!authData) {
      return navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/create-student"
        element={<CreateStudent setIsLoading={setIsLoading} />}
      />
      <Route
        path="/view-students"
        element={<ViewStudents setIsLoading={setIsLoading} />}
      />
      <Route
        path="/view-student/:username"
        element={<ViewStudent setIsLoading={setIsLoading} />}
      />
      <Route path="/results" element={<Results />} />
      <Route
        path="/results/:term"
        element={<ViewResults setIsLoading={setIsLoading} />}
      />
      <Route
        path="/result/:username/:session/:term"
        element={<ViewResult setIsLoading={setIsLoading} />}
      />
    </Routes>
  );
}

export default FormTeacher;
