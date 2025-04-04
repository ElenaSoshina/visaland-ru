import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import Layout from "./components/Layout/Layout.jsx";
import KnowledgeBasePage from "./pages/KnowledgeBasePage/KnowledgeBasePage.jsx";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage.jsx";
import UsefulInfo from "./pages/UsefulInfo/UsefulInfo.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/index.html" replace />} />
                <Route path="/index.html" element={<HomePage />} />
                <Route path="/service.html" element={<ServicesPage />} />
                <Route path="/service/:id.html" element={<ServiceDetailPage />} />
                <Route path="/baza-znaniy.html" element={<KnowledgeBasePage />} />
                <Route path="/articles.html" element={<ArticlesPage />} />
                <Route path="/about.html" element={<AboutPage />} />
                <Route path="/usefulinfo.html" element={<UsefulInfo />} />
                <Route path="/faq.html" element={<FAQ />} />
            </Route>
        </Routes>
    );
}
