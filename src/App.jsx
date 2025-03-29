import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import Layout from "./components/Layout/Layout.jsx";
import KnowledgeBasePage from "./pages/KnowledgeBasePage/KnowledgeBasePage.jsx";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/index.html" replace />} />

                <Route path="/" element={<Layout />}>
                    <Route path="/index.html" element={<HomePage />} />
                    <Route path="/service.html" element={<ServicesPage />} />
                    <Route path="/baza-znaniy.html" element={<KnowledgeBasePage />} />
                    <Route path="/articles.html" element={<ArticlesPage />} />
                    <Route path="/about.html" element={<AboutPage />} />
                </Route>
            </Routes>
        </Router>
    );
}
