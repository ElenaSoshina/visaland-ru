import React, { useState } from 'react';
import styles from './ContactModal.module.css';
import {sendMessageToTelegram} from "../../utils/telegramAPI.js";
import Select from 'react-select';
import { X } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState(null);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [sending, setSending] = useState(false);

    const serviceOptions = [
        { value: 'Загранпаспорт', label: 'Загранпаспорт' },
        { value: 'Российский паспорт', label: 'Российский паспорт' },
        { value: 'Справка об отсуствии/наличии судимости', label: 'Справка об отсуствии/наличии судимости' },
        { value: 'Апостиль документов', label: 'Апостиль документов' }
    ];

    // Стили для react-select
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: errors.service ? '#e53935' : provided.borderColor,
            borderRadius: '8px',
            padding: '2px',
            boxShadow: 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#ed5e5e' : provided.borderColor
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#ed5e5e' : state.isFocused ? '#f9f9f9' : 'white',
            color: state.isSelected ? 'white' : '#333',
            '&:hover': {
                backgroundColor: state.isSelected ? '#ed5e5e' : '#f0f0f0'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#888'
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 100
        })
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
        if (!/^\+7\d{10}$/.test(phone)) newErrors.phone = 'Введите корректный номер телефона в формате +7XXXXXXXXXX';

        if (!service) newErrors.service = 'Пожалуйста, выберите услугу';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSending(true);

            try {
                await sendMessageToTelegram({
                    name,
                    phone,
                    service: service.value,
                    comment
                });

                setSending(false);
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                    setName('');
                    setPhone('');
                    setService(null);
                    setComment('');
                    onClose();
                }, 3000);
            } catch (error) {
                console.error("Ошибка при отправке:", error);
                setSending(false);
                alert("Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам напрямую.");
            }
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
                        <button className={styles.closeButton} onClick={onClose}>
                            <X size={20} />
                        </button>
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

                            <div className={styles.fieldWrapper}>
                                <Select
                                    options={serviceOptions}
                                    value={service}
                                    onChange={setService}
                                    placeholder="Выберите услугу"
                                    styles={customSelectStyles}
                                    isClearable={false}
                                    isSearchable={false}
                                    classNamePrefix="react-select"
                                />
                                {errors.service && <span className={styles.errorMsg}>{errors.service}</span>}
                            </div>

                            <textarea
                                placeholder="Комментарий (необязательно)"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                                type="submit"
                                className={styles.button}
                                disabled={sending}
                            >
                                {sending ? 'Отправка...' : 'Отправить'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
} 