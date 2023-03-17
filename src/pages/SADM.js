import { Sidebar } from "../components";
import { Routes, Route } from "react-router-dom";

export function SADM() {
  return (
    <div className="w-full h-full flex ">
      <Sidebar />
      <Routes>
        <Route path="/distributeurs" element={<div>distributeurs</div>} />
        <Route path="/clients" element={<div>clients</div>} />
      </Routes>
    </div>
  );
}
