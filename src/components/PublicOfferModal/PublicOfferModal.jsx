import React from "react";
import styles from "./PublicOfferModal.module.css";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const PublicOfferModal = ({ onClose }) => {
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
                <h2>Публичная оферта</h2>
                <p>Настоящая оферта является официальным предложением по оказанию услуг.</p>
                <p>Оформляя заявку, вы принимаете условия договора, опубликованного на сайте.</p>
                <p>Детали и условия договора могут быть уточнены по запросу.</p>
                <button className={styles.confirmButton} onClick={onClose}>ОК</button>
            </motion.div>
        </div>
    );
};

export default PublicOfferModal;
