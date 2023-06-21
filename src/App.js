import React from "react";
import { ContextWrapper } from "./context";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { SADM, Login, ADM, AC, Decideur, LineChart } from "./pages";
import ProtectedRoute from "./components/protectedRoute";
import {
	validateSADM,
	validateADM,
	validateAC,
	validateDecideur,
} from "./util/authValidators";
import PublicRoute from "./components/publicRoute";

/**
 * the main component of the app
 * contains the differents routes and their corresponding pages
 * @component
 * @returns {React.ReactElement}
 */
function App() {
	return (
		<ContextWrapper>
			<Router>
				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/SADM/*'
						element={
							<ProtectedRoute validate={validateSADM}>
								<SADM />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/ADM/*'
						element={
							<ProtectedRoute validate={validateADM}>
								<ADM />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/AC/*'
						element={
							<ProtectedRoute validate={validateAC}>
								<AC />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/DECIDEUR/*'
						element={
							<ProtectedRoute validate={validateDecideur}>
								<Decideur />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</ContextWrapper>
	);
}

export default App;
