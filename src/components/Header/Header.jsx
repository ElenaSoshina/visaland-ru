import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import clsx from 'clsx';

export default function Header({ onOpenModal}) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={clsx(styles.container, styles.inner)}>
                <div className={styles.logo}>
                    <Link to="/index.html">
                        <span className={styles.logoVisa}>VISA</span>
                        <span className={styles.logoLand}>LAND</span>
                    </Link>
                </div>

                <button
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Открыть меню"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className={clsx(styles.menu, menuOpen && styles.menuOpen)}>
                    <nav className={styles.nav}>
                        <Link to="/service.html" onClick={() => setMenuOpen(false)}>Услуги</Link>
                        <Link to="/baza-znaniy.html" onClick={() => setMenuOpen(false)}>База знаний</Link>
                        <Link to="/articles.html" onClick={() => setMenuOpen(false)}>Статьи</Link>
                        <Link to="/about.html" onClick={() => setMenuOpen(false)}>О нас</Link>
                    </nav>

                    <div className={styles.contact}>
                        <a href="tel:+7 (495) 225-42-66" className={styles.phone}>
                            +7 (499) 681-70-14
                        </a>
                        <button className={styles.button} onClick={() => {
                            setMenuOpen(false);
                            onOpenModal();
                        }}>Оставить заявку</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
