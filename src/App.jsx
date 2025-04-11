import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import Layout from "./components/Layout/Layout.jsx";
import KnowledgeBasePage from "./pages/KnowledgeBasePage/KnowledgeBasePage.jsx";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage.jsx";
import UsefulInfo from "./pages/UsefulInfo/UsefulInfo.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";

// Компонент для сброса положения скролла при смене страницы
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/index.html" replace />} />
                    <Route path="/index.html" element={<HomePage />} />
                    <Route path="/services.html" element={<ServicesPage />} />
                    <Route path="/about.html" element={<AboutPage />} />
                    <Route path="/:id.html" element={<ServiceDetailPage />} />
                    <Route path="/articles.html" element={<ArticlesPage />} />
                    <Route path="/usefulinfo.html" element={<KnowledgeBasePage />} />
                    <Route path="/faq.html" element={<FAQ />} />
                </Route>
            </Routes>
        </>
    );
}
