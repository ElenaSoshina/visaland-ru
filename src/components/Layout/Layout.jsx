import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from "../Header/Header.jsx";
import Modal from "../Modal/Modal.jsx";
import clsx from "clsx";

export default function Layout() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Header onOpenModal={() => setModalOpen(true)} />

            <main className={clsx(styles.main, styles.container)}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <p>© Visaland, 2025</p>
            </footer>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}