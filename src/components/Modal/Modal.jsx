import React, { useState } from 'react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handlePhoneFocus = () => {
        if (!phone) setPhone('+7');
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\+7\d{0,10}$/.test(value)) {
            setPhone(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
        if (!/^\+7\d{10}$/.test(phone)) newErrors.phone = 'Введите корректный номер телефона в формате +7XXXXXXXXXX';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setName('');
                setPhone('');
                onClose();
            }, 3000);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {success ? (
                    <div className={styles.successOverlay}>
                        <p className={styles.successTitle}>Ваша заявка успешно отправлена!</p>
                    </div>
                ) : (
                    <>
                        <button className={styles.close} onClick={onClose}>&times;</button>
                        <h2 className={styles.title}>Оставьте заявку и мы свяжемся с Вами!</h2>
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <div className={styles.fieldWrapper}>
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={errors.name ? styles.errorField : ''}
                                />
                                {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                            </div>

                            <div className={styles.fieldWrapper}>
                                <input
                                    type="tel"
                                    placeholder="Телефон"
                                    value={phone}
                                    onFocus={handlePhoneFocus}
                                    onChange={handlePhoneChange}
                                    className={errors.phone ? styles.errorField : ''}
                                />
                                {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                            </div>

                            <select>
                                <option value="">Выберите услугу (необязательно)</option>
                                <optgroup label="Гражданство и проживание">
                                    <option value="rpn">РВП</option>
                                    <option value="vnzh">ВНЖ</option>
                                    <option value="citizenship">Гражданство РФ</option>
                                </optgroup>
                                <optgroup label="Загранпаспорта">
                                    <option value="passport-urgent-child">Загранпаспорт для детей срочно</option>
                                    <option value="passport-no-registration">Загранпаспорт без регистрации в Москве</option>
                                    <option value="passport-standard">Загранпаспорт стандартного образца</option>
                                    <option value="passport-biometric">Загранпаспорт биометрического образца</option>
                                    <option value="passport-no-military-id">Загранпаспорт без военного билета</option>
                                    <option value="passport-fast">Содействие в ускоренном получении заграничного паспорта</option>
                                </optgroup>
                                <optgroup label="Справки и приглашения">
                                    <option value="criminal-record">Справка о наличии/отсутствии судимости</option>
                                    <option value="invitation">Приглашения иностранным гражданам в РФ</option>
                                </optgroup>
                                <optgroup label="Визы">
                                    <option value="visas">Визы в различные страны для граждан России</option>
                                </optgroup>
                            </select>

                            <textarea placeholder="Комментарий (необязательно)" rows="3"></textarea>

                            <button type="submit" className={styles.button}>Отправить</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}