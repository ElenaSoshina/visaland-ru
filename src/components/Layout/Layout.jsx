import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from "../Header/Header.jsx";
import Modal from "../Modal/Modal.jsx";


export default function Layout() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Header onOpenModal={() => setModalOpen(true)} />

            <main className={styles.main}>
                <div className="container">
                    <Outlet/>
                </div>
            </main>
            <footer className={styles.footer}>
                <p>© Visaland, 2025</p>
            </footer>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}