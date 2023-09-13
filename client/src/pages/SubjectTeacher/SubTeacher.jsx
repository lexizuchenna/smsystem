import { useNavigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Dashboard from "./Dashboard";
import CreateResult from "./CreateResult";
import ViewStudents from "./ViewStudents";
import ViewGrades from "./ViewGrades";

import { auth } from "../../features/selectors";

function SubTeacher({ setIsLoading }) {
  const navigate = useNavigate();
  const { authData } = useSelector(auth);

  useEffect(() => {
    if (authData && authData.role !== "sub-teacher") {
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
        path="/create-result"
        element={<ViewGrades />}
      />
      <Route
        path="/view-students/:grade"
        element={<ViewStudents setIsLoading={setIsLoading} />}
      />
      <Route
        path="/create-result/:username"
        element={<CreateResult setIsLoading={setIsLoading} />}
      />
    </Routes>
  );
}

export default SubTeacher;
