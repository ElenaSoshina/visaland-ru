import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import clsx from 'clsx';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

export default function Header({ onOpenModal}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.logo}>
                    <Link to="/index.html">
                        <span className={styles.logoVisa}>VISA</span>
                        <span className={styles.logoLand}>LAND</span>
                    </Link>
                </div>

                <div className={clsx(styles.menu, menuOpen && styles.menuOpen)}>
                    <nav className={styles.nav}>
                        <Link to="/index.html" onClick={() => setMenuOpen(false)}>Главная</Link>
                        <Link to="/service.html" onClick={() => setMenuOpen(false)}>Услуги</Link>
                        <Link to="/about.html" onClick={() => setMenuOpen(false)}>О нас</Link>
                    </nav>

                    <div className={styles.contact}>
                        <button className={styles.button} onClick={() => {
                            setMenuOpen(false);
                            onOpenModal();
                        }}>Оставить заявку</button>
                    </div>
                </div>
                
                <div className={styles.headerRight}>
                    <div className={styles.topSocialButtons}>
                        <a href="https://wa.me/+79031363808" className={styles.socialButton}>
                            <FaWhatsapp className={`${styles.socialIcon} ${styles.whatsappIcon}`} />
                            <span className={styles.socialText}>Менеджер</span>
                        </a>
                        <a href="https://t.me/+79031363808" className={styles.socialButton}>
                            <FaTelegram className={`${styles.socialIcon} ${styles.telegramIcon}`} />
                            <span className={styles.socialText}>Менеджер</span>
                        </a>
                    </div>

                    <button
                        className={`${styles.burger} ${menuOpen ? styles.burgerActive : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Открыть меню"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

               
            </div>
        </header>
    );
}
