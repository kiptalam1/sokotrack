import {} from "react";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/auth/register" element={<Register />} />
			</Routes>
		</>
	);
}

export default App;
