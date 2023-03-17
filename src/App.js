import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SADM, Login , LineChart } from "./pages";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<div>main</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/SADM/*" element={<SADM />} />
          <Route path="/test/" element={<LineChart/>} />
        </Routes>
      </Router>
    </ContextWrapper>
  );
}

export default App;
