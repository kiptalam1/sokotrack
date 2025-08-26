import {} from "react";
import { Toaster } from "sonner";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<>
			<Toaster position="top-center" richColors />
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/auth/login" element={<Login />} />

				{/* private routes */}
				<Route path="/dashboard/:role" element={<Dashboard />} />
			</Routes>
		</>
	);
}

export default App;
