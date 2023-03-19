import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SADM, Login, ADM } from "./pages";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SADM/*" element={<SADM />} />
          <Route path="/ADM/*" element={<ADM />} />
        </Routes>
      </Router>
    </ContextWrapper>
  );
}

export default App;
