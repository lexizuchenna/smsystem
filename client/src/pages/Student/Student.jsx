import { useNavigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import Newsletter from "./Newsletter";
import Main from "./All Results/Main";

import { auth } from "../../features/selectors";
function Student({ setIsLoading }) {
  const navigate = useNavigate();

  const { authData } = useSelector(auth);

  useEffect(() => {
    if (authData && authData.role !== "student") {
      return navigate(`/${authData.role}/dashboard`);
    }

    if (!authData) {
      return navigate("/");
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/result" element={<Main setIsLoading={setIsLoading} />} />
      <Route
        path="/newsletter"
        element={<Newsletter setIsLoading={setIsLoading} />}
      />
    </Routes>
  );
}

export default Student;
