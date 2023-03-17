import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SADM, Login } from "./pages";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<div>main</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/SADM/*" element={<SADM />} />
        </Routes>
      </Router>
    </ContextWrapper>
  );
}

export default App;
