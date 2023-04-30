import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SADM, Login, ADM, LineChart } from "./pages";

function App() {
  return (
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SADM/*" element={<SADM />} />
          <Route path="/ADM/*" element={<ADM />} />
          <Route path="/test/" element={<LineChart title="Taux d'utilisation "/>} />
        </Routes>
      </Router>
    </ContextWrapper>
  );
}

export default App;
