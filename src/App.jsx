import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import AdminSummaryPage from "./pages/AdminSummaryPage.jsx";

export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin-summary" element={<AdminSummaryPage />} />
            </Routes>
        </Router>
    );
}