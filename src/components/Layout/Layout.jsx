import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from "../Header/Header.jsx";
import ContactModal from "../ContactModal/ContactModal.jsx";
import Footer from "../Footer/Footer.jsx";


export default function Layout() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.layoutContainer}>
            <div className={styles.wrapper}>
                <Header onOpenModal={() => setModalOpen(true)} />

                <main className="container">
                    <div>
                        <Outlet/>
                    </div>
                </main>
            </div>
            
            <Footer />

            <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}