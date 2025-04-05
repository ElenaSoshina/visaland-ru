import React, { useState } from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);

    const handlePhoneFocus = () => {
        if (!phone) setPhone('+7');
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\+7\d{0,10}$/.test(value)) {
            setPhone(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
        if (!/^\+7\d{10}$/.test(phone)) newErrors.phone = 'Введите корректный номер телефона в формате +7XXXXXXXXXX';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSending(true);
            
            // Имитация отправки
            setTimeout(() => {
                setSending(false);
                setSuccess(true);
                
                setTimeout(() => {
                    setSuccess(false);
                    setName('');
                    setPhone('');
                }, 3000);
            }, 1000);
        }
    };

    return (
        <section className={styles.contactSection}>
            <h2 className={styles.contactTitle}>У вас остались вопросы?</h2>
            <p className={styles.contactSubtitle}>Свяжитесь с нами:</p>
            
            {success ? (
                <div className={styles.successMessage}>
                    <p>Ваша заявка успешно отправлена!</p>
                </div>
            ) : (
                <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldWrapper}>
                        <label htmlFor="name" className={styles.label}>Имя *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Введите ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errors.name ? `${styles.input} ${styles.errorField}` : styles.input}
                        />
                        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                    </div>

                    <div className={styles.fieldWrapper}>
                        <label htmlFor="phone" className={styles.label}>Ваш номер телефона *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Телефон"
                            value={phone}
                            onFocus={handlePhoneFocus}
                            onChange={handlePhoneChange}
                            className={errors.phone ? `${styles.input} ${styles.errorField}` : styles.input}
                        />
                        {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={sending}
                    >
                        {sending ? 'ОТПРАВКА...' : 'ОСТАВИТЬ ЗАЯВКУ НА ОБРАТНЫЙ ЗВОНОК'}
                    </button>
                </form>
            )}
        </section>
    );
};

export default ContactSection;
