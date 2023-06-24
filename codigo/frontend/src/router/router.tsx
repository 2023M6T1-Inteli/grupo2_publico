import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import { Wrapper } from "./Styles";
import Projects from "../pages/Projects/Projects";
import Machines from "../pages/Machines/Machines";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";

export default function App() {
  return (
    <Wrapper>
      <Sidebar />
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails/>} />
        <Route path="/machines" element={<Machines />} />
      </Routes>
    </Wrapper>
  )
}