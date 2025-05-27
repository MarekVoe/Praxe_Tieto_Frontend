import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import AdminSummaryPage from "./pages/AdminSummaryPage.jsx";
import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        fetch('http://localhost:8080/votes/generateToken')
            .then(res => res.text()
                .then(data => {
                    console.log("Token generated:", data);
                    localStorage.setItem("token", data);
                })).catch(err => console.log(err));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin-summary" element={<AdminSummaryPage />} />
            </Routes>
        </Router>
    );
}