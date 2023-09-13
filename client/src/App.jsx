import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth, fTeacher, sTeacher, student, admin } from "./features/selectors";
import { routes } from "./constants";

import UserHeader from "./components/UserHeader";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";

import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import FormTeacher from "./pages/FormTeacher/FormTeacher";
import SubTeacher from "./pages/SubjectTeacher/SubTeacher";
import Student from "./pages/Student/Student";

import { Container } from "reactstrap";


function App() {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthLoading } = useSelector(auth);
  const { isAdminLoading } = useSelector(admin);
  const { isStudentLoading } = useSelector(student);
  const { isFTeacherLoading } = useSelector(fTeacher);
  const { isSTeacherLoading } = useSelector(sTeacher);

  return (
    <>
      <Router>
        {isAuthLoading ||
        isLoading ||
        isAdminLoading ||
        isStudentLoading ||
        isFTeacherLoading ||
        isSTeacherLoading ? (
          <Loader />
        ) : (
          ""
        )}

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/admin/*"
            element={
              <div>
                <Sidebar />
                <div className="main-content">
                  <UserHeader />
                  <Container>
                    <Admin setIsLoading={setIsLoading} />
                  </Container>
                </div>
              </div>
            }
          />
          <Route
            path="/form-teacher/*"
            element={
              <div>
                <Sidebar />
                <div className="main-content">
                  <UserHeader />
                  <Container>
                    <FormTeacher setIsLoading={setIsLoading} />
                  </Container>
                </div>
              </div>
            }
          />
          <Route
            path="/sub-teacher/*"
            element={
              <div>
                <Sidebar />
                <div className="main-content">
                  <UserHeader />
                  <Container>
                    <SubTeacher setIsLoading={setIsLoading} />
                  </Container>
                </div>
              </div>
            }
          />
          <Route
            path="/student/*"
            element={
              <div>
                <Sidebar />
                <div className="main-content">
                  <UserHeader />
                  <Container>
                    <Student   setIsLoading={setIsLoading}/>
                  </Container>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      />
    </>
  );
}

export default App;
