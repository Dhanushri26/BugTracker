import "./App.css";
import BugPage from "./pages/BugPage";
import Dashboard from "./pages/Dashboard";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BugPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
