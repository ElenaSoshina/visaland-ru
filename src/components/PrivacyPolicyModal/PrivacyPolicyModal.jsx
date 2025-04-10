import React from "react";
import styles from "./PrivacyPolicyModal.module.css";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const PrivacyPolicyModal = ({ onClose }) => {
    return (
        <div className={styles.overlay}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={styles.modal}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={24} />
                </button>
                <h2>Политика конфиденциальности</h2>
                <p>Мы собираем и обрабатываем ваши персональные данные в соответствии с законодательством РФ.</p>
                <p>Используя наш сайт, вы соглашаетесь с нашей политикой обработки данных.</p>
                <p>Для более детальной информации, пожалуйста, свяжитесь с нами.</p>
                <button className={styles.confirmButton} onClick={onClose}>ОК</button>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicyModal;
