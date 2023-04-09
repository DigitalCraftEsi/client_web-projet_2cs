import React from "react";
import { ContextWrapper } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SADM, Login, ADM, AC, Decideur } from "./pages";

function App() {
	return (
		<ContextWrapper>
			<Router>
				<Routes>
					<Route path='/' element={<div>main</div>} />
					<Route path='/login' element={<Login />} />
					<Route path='/SADM/*' element={<SADM />} />
					<Route path='/ADM/*' element={<ADM />} />
					<Route path='/AC/*' element={<AC />} />
					<Route path='/Decideur/*' element={<Decideur />} />
				</Routes>
			</Router>
		</ContextWrapper>
	);
}

export default App;
