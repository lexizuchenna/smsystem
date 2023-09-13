import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import CreateTeacher from "./CreateTeacher";
import ViewTeachers from "./ViewTeachers";
import ViewResults from "./ViewResults";
import ViewResult from "./ViewResult";
import Sessions from "./Sessions";
import Session from "./Session";
import Results3 from "./Results3";
import Results2 from "./Results2";
import Results from "./Results";
import Main from "./All Results/Main";
import ViewSession from "./ViewSession";

import { auth } from "../../features/selectors";

function Admin({ setIsLoading }) {
  const navigate = useNavigate();

  const { authData } = useSelector(auth);

  useEffect(() => {
    if (authData && authData.role !== "admin") {
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
        path="/create-teacher"
        element={<CreateTeacher setIsLoading={setIsLoading} />}
      />
      <Route
        path="/teachers"
        element={<ViewTeachers setIsLoading={setIsLoading} />}
      />
      <Route
        path="/results"
        element={<ViewResults setIsLoading={setIsLoading} />}
      />
      <Route
        path="/result/:username/:session/:term"
        element={<ViewResult setIsLoading={setIsLoading} />}
      />
      <Route path="/select-session" element={<Results3 />} />
      <Route path="/select-term" element={<Results2 />} />
      <Route path="/select-grade" element={<Results />} />
      <Route
        path="/all-results"
        element={<Main setIsLoading={setIsLoading} />}
      />
      <Route
        path="/sessions"
        element={<Sessions setIsLoading={setIsLoading} />}
      />
      <Route
        path="/create-session/"
        element={<Session setIsLoading={setIsLoading} />}
      />
      <Route
        path="/session/:session"
        element={<ViewSession setIsLoading={setIsLoading} />}
      />
    </Routes>
  );
}

export default Admin;
