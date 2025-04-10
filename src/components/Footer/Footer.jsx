import React, { useState } from "react";
import styles from "./Footer.module.css";
import { FaWhatsapp, FaTelegramPlane, FaMapMarkerAlt, FaPhoneAlt, FaRegClock } from "react-icons/fa";
import PrivacyPolicyModal from "../PrivacyPolicyModal/PrivacyPolicyModal";
import PublicOfferModal from "../PublicOfferModal/PublicOfferModal";


const trackUptolike = (platform) => {
    if (window.uptolike && window.uptolike.trackEvent) {
        window.uptolike.trackEvent("click", {
            category: "Social",
            action: "Share",
            label: platform
        });
    }
};


function Footer() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [isPublicOfferOpen, setIsPublicOfferOpen] = useState(false);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <h2 className={styles.logo}>
                    <span className={styles.highlight}>VISALAND</span>
                </h2>

                <div className={styles.infoBlocks}>
                    <div className={styles.infoBlock}>
                        <FaMapMarkerAlt className={styles.icon}/>
                        <p>г. Москва, ул. Тверская, д. 20, стр. 1, 4 этаж, офис 401</p>
                    </div>

                    <div className={styles.infoBlock}>
                        <FaPhoneAlt className={styles.icon}/>
                        <p>Тел.: <a href="tel:+74991363808">+7 (499) 136-38-08</a></p>
                        <p>Email: <a href="mailto:visaland@mail.ru">visaland@mail.ru</a></p>
                    </div>

                    <div className={styles.infoBlock}>
                        <FaRegClock className={styles.icon}/>
                        <p>Пн-Пт: 10:00 – 18:00</p>
                        <p>Сб-Вс: Выходной</p>
                    </div>
                </div>

                <div className={styles.legal}>
                    <p className={styles.legalText}>© VISALAND — Оформление заграничных паспортов в России.</p>
                    <button className={styles.link} onClick={() => setIsPrivacyOpen(true)}>Политика конфиденциальности</button> |
                    <button className={styles.link} onClick={() => setIsPublicOfferOpen(true)}>Публичная оферта</button>
                </div>
            </div>

            {/* Модальные окна */}
            {isPrivacyOpen && <PrivacyPolicyModal onClose={() => setIsPrivacyOpen(false)} />}
            {isPublicOfferOpen && <PublicOfferModal onClose={() => setIsPublicOfferOpen(false)} />}
        </footer>
    );
}

export default Footer;
