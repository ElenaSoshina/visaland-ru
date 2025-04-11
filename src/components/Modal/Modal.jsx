import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FaFingerprint } from "react-icons/fa";
import styles from "./Modal.module.css";
import { IMaskInput } from "react-imask";
import { sendMessageToTelegram } from '../../utils/telegramAPI';

const Modal = ({ isOpen, onClose, serviceId }) => {
    // Значения по умолчанию в зависимости от услуги
    const getDefaultAge = () => {
        if (serviceId === 'oformlenie-zagranpasporta-na-rebenka') {
            return "Дети до 14 лет";
        }
        if (serviceId === 'zagranpasport-srochno-nedorogo') {
            return "Взрослые и подростки от 14 лет";
        }
        return "Взрослые и подростки от 14 лет";
    };

    const getDefaultResidence = () => {
        if (serviceId === 'zagranpasport-bez-registratsii-v-moskve' || serviceId === 'zagranpassport-debt') {
            return "Регионы РФ";
        }
        return "Москва и обл.";
    };

    const [selectedResidence, setSelectedResidence] = useState(getDefaultResidence());
    const [selectedAge, setSelectedAge] = useState(getDefaultAge());
    const [selectedBioIndex, setSelectedBioIndex] = useState(null);
    const [selectedOldIndex, setSelectedOldIndex] = useState(null);
    const [selectedPassportType, setSelectedPassportType] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({ name: "", phone: "", consent: true });
    const [errors, setErrors] = useState({ name: "", phone: "", consent: "", service: "" });
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [needApostil, setNeedApostil] = useState(false);

    // Обновляем состояния при изменении serviceId
    useEffect(() => {
        setSelectedAge(getDefaultAge());
        setSelectedResidence(getDefaultResidence());
        setSelectedBioIndex(null);
        setSelectedOldIndex(null);
        setTotalPrice(0);
        setSelectedPassportType("");
        setSelectedDuration("");
    }, [serviceId]);

    // Цены для разных услуг
    const bioPricesAdult = [
        { label: "5 раб. день", price: 86000 },
        { label: "6 раб. день", price: 72000 },
        { label: "7 раб. день", price: 68000 },
        { label: "8 раб. день", price: 61000 },
        { label: "12 раб. день", price: 37000 },
        { label: "13 раб. день", price: 28000 },
        { label: "17 раб. день", price: 24000 },
        { label: "24 раб. день", price: 23000 },
    ];

    const debtPrices = [
        { label: "Долг (не алименты) до 1 млн.руб", price: 55000 },
        { label: "Долг (не алименты) до 2 млн.руб", price: 60000 },
        { label: "Долг (не алименты) до 3 млн.руб", price: 65000 },
    ];

    const noMilitaryPrices = [
        { label: "1 месяц", price: 55000 }
    ];

    const oldPricesAdult = [
        { label: "5 раб. день", price: 75000 },
        { label: "6 раб. день", price: 68000 },
        { label: "7 раб. день", price: 62000 },
        { label: "8 раб. день", price: 54000 },
        { label: "17 раб. день", price: 25500 },
        { label: "24 раб. день", price: 22000 },
    ];

    const bioPricesChild = [
        { label: "2 раб. день", price: 50000 },
        { label: "5 раб. день", price: 23000 },
        { label: "7 раб. день", price: 21000 },
        { label: "12 раб. день", price: 19000 },
    ];

    const urgentChildPrices = [
        { label: "1 раб. день", price: 65000 },
        { label: "2 раб. день", price: 55000 },
        { label: "3 раб. день", price: 45000 },
    ];

    const oldPricesChild = [
        { label: "1 раб. день", price: 30000 },
        { label: "2 раб. день", price: 26000 },
        { label: "3 раб. день", price: 23000 },
        { label: "5 раб. день", price: 21000 },
        { label: "12 раб. день", price: 18000 },
    ];

    // Цены для российского паспорта
    const ruPassportPrices = [
        { label: "день в день", price: 45000 },
        { label: "день в день (утрата)", price: 45000 },
        { label: "1 раб. дней", price: 38000 },
        { label: "2-3 раб. дней", price: 35000 },
        { label: "3 недели (ДНР и ЛНР)", price: 45000 },
    ];

    // Цены для справки о судимости
    const criminalRecordPrices = [
        { label: "2 раб. дня", price: 22000 },
        { label: "3 раб. дня", price: 19000 },
        { label: "7 раб. дней", price: 14500 },
        { label: "11 раб. дней", price: 10500 },
    ];

    // Цены для апостиля документов
    const apostilPrices = [
        { label: "2-4 раб. дня", documentType: "Справки и свидетельства ЗАГС", price: 23000 },
        { label: "1 раб. день до 10:30", documentType: "Апостиль на оригиналы св-в и справок (MO)", price: 13000 },
        { label: "5-7 раб. дней", documentType: "Апостиль на оригиналы св-в и справок (MO)", price: 11000 },
        { label: "1 раб. день до 10:30", documentType: "Апостиль на оригиналы св-в и справок (Москва)", price: 17000 },
        { label: "7 раб. дней", documentType: "Апостиль на оригиналы св-в и справок (Москва)", price: 11000 },
        { label: "день в день до 10:30", documentType: "Апостиль на нот.копии и документы Минюст (МО)", price: 17000 },
        { label: "1 раб. день до 10:30", documentType: "Апостиль на нот.копии и документы Минюст (МО)", price: 12500 },
        { label: "4 раб. день до 10:30", documentType: "Апостиль на нот.копии и документы Минюст (МО)", price: 9000 },
        { label: "4 раб. дней", documentType: "Апостиль на нот.копии и документы Минюст (Москва)", price: 11500 },
        { label: "7 раб. дней", documentType: "Апостиль на нот.копии и документы Минюст (Москва)", price: 9000 },
    ];

    const handleResidenceClick = (residence) => {
        setSelectedResidence(residence);
    };

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
        setSelectedBioIndex(null);
        setSelectedOldIndex(null);
        setTotalPrice(0);
        setSelectedPassportType("");
        setSelectedDuration("");
    };

    const handleSelectPrice = (price, index, type, duration) => {
        if (type === "bio") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Биометрический загранпаспорт');
        } else if (type === "old") {
            setSelectedOldIndex(index);
            setSelectedBioIndex(null);
            setSelectedPassportType('Загранпаспорт старого образца');
        } else if (type === "rupassport") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Российский паспорт для граждан РФ');
        } else if (type === "criminal") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Справка о наличии/отсутствии судимости');
        } else if (type === "apostil") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Апостиль документов');
        } else if (type === "no-military") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Загранпаспорт без военного билета');
        } else if (type === "debt") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Загранпаспорт с задолженностями');
        } else if (type === "no-reg") {
            setSelectedBioIndex(index);
            setSelectedOldIndex(null);
            setSelectedPassportType('Загранпаспорт без регистрации');
        }
        
        setSelectedDuration(duration);
        setTotalPrice(price);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({ ...prev, phone: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) {
            newErrors.name = "Введите ваше имя";
        }
        
        if (!formData.phone) {
            newErrors.phone = "Введите номер телефона";
        } else if (formData.phone.replace(/\D/g, '').length !== 11) {
            newErrors.phone = "Введите корректный номер телефона";
        }
        
        if (!selectedPassportType || !selectedDuration) {
            newErrors.service = "Выберите услугу и срок изготовления";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formDataToSend = {
            name: formData.name,
            phone: formData.phone,
            service: serviceId,
            passportType: selectedPassportType,
            duration: selectedDuration,
            residence: selectedResidence,
            age: selectedAge,
            totalPrice: totalPrice,
            comment: formData.comment,
            apostil: serviceId === 'spravka-ob-otsustvii-sudimosti' ? needApostil : false
        };

        try {
            const success = await sendMessageToTelegram(formDataToSend);
            if (success) {
                setIsSuccessPopupOpen(true);
            } else {
                alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка при отправке заявки:', error);
            alert('Ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
        }
    };

    const handleSuccessPopupClose = () => {
        setIsSuccessPopupOpen(false);
        onClose();
    };

    const getBioPrices = () => {
        if (serviceId === 'zagranpasport-bez-voennogo-bileta') {
            return noMilitaryPrices;
        }
        if (serviceId === 'zagranpassport-debt') {
            return debtPrices;
        }
        if (serviceId === 'zagranpasport-srochno-nedorogo') {
            return selectedAge === 'Дети до 14 лет' ? bioPricesChild : bioPricesAdult;
        }
        if (serviceId === 'oformlenie-zagranpasporta-na-rebenka') {
            return selectedAge === 'Дети до 14 лет' ? bioPricesChild : bioPricesAdult;
        }
        if (serviceId === 'zagranpasport-bez-registratsii-v-moskve') {
            return selectedAge === 'Дети до 14 лет' ? bioPricesChild : bioPricesAdult;
        }
        return bioPricesAdult;
    };

    const getOldPrices = () => {
        if (serviceId === 'zagranpasport-srochno-nedorogo') {
            return selectedAge === 'Дети до 14 лет' ? oldPricesChild : oldPricesAdult;
        }
        if (serviceId === 'oformlenie-zagranpasporta-na-rebenka') {
            return selectedAge === 'Дети до 14 лет' ? oldPricesChild : oldPricesAdult;
        }
        if (serviceId === 'zagranpasport-bez-registratsii-v-moskve') {
            return selectedAge === 'Дети до 14 лет' ? oldPricesChild : oldPricesAdult;
        }
        return selectedAge === 'Дети до 14 лет' ? oldPricesChild : oldPricesAdult;
    };

    // Определяем, какие карточки показывать в зависимости от типа услуги
    const shouldShowBioCard = () => {
        return serviceId === 'zagranpasport-srochno-nedorogo' || 
               serviceId === 'zagranpasport-bez-registratsii-v-moskve' || 
               serviceId === 'zagranpasport-bez-voennogo-bileta' ||
               serviceId === 'zagranpassport-debt' ||
               serviceId === 'oformlenie-zagranpasporta-na-rebenka';
    };

    const shouldShowOldCard = () => {
        return serviceId === 'zagranpasport-srochno-nedorogo' || 
               serviceId === 'zagranpasport-bez-registratsii-v-moskve' ||
               serviceId === 'oformlenie-zagranpasporta-na-rebenka';
    };

    const shouldShowRuPassportCard = () => {
        return serviceId === 'rossiyskiy-pasport';
    };

    const shouldShowCriminalRecordCard = () => {
        return serviceId === 'spravka-ob-otsustvii-sudimosti';
    };

    const shouldShowApostilCard = () => {
        return serviceId === 'apostil';
    };

    const shouldShowAgeSelect = () => {
        return serviceId === 'zagranpasport-srochno-nedorogo' || 
               serviceId === 'zagranpasport-bez-registratsii-v-moskve' ||
               serviceId === 'oformlenie-zagranpasporta-na-rebenka';
    };

    const handleApostilToggle = () => {
        setNeedApostil(!needApostil);
        if (selectedPassportType === 'Справка о наличии/отсутствии судимости') {
            const basePrice = criminalRecordPrices[selectedBioIndex]?.price || 0;
            setTotalPrice(needApostil ? basePrice : basePrice + 12000);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <motion.div 
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div 
                    className={styles.modal}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                    <div className={styles.modalBody}>
                        <h2 className={styles.title}>Рассчитать стоимость онлайн</h2>
                        
                        <div className={styles.residenceGroup}>
                            <span className={styles.label}>Регистрация по месту жительства:</span>
                            <div className={styles.toggleButtons}>
                                <button
                                    className={`${styles.toggleButton} ${selectedResidence === "Москва и обл." ? styles.activeToggle : styles.inactiveToggle}`}
                                    onClick={() => handleResidenceClick("Москва и обл.")}
                                >
                                    Москва и обл.
                                </button>
                                <button
                                    className={`${styles.toggleButton} ${selectedResidence === "Регионы РФ" ? styles.activeToggle : styles.inactiveToggle}`}
                                    onClick={() => handleResidenceClick("Регионы РФ")}
                                >
                                    Регионы РФ
                                </button>
                            </div>
                        </div>

                        {shouldShowAgeSelect() && (
                            <div className={styles.inputGroup}>
                                <label htmlFor="age">Возраст</label>
                                <div className={styles.selectWrapper}>
                                    <select 
                                        id="age" 
                                        value={selectedAge} 
                                        className={styles.select} 
                                        onChange={handleAgeChange}
                                    >
                                        <option>Взрослые и подростки от 14 лет</option>
                                        <option>Дети до 14 лет</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className={styles.passportContainer}>
                            {shouldShowBioCard() && (
                                <div className={`${styles.passportBox} ${errors.service ? styles.error : ''}`}>
                                    <div className={styles.passportHeader}>
                                        <h3>Биометрический загранпаспорт</h3>
                                        <FaFingerprint className={styles.passportIcon}/>
                                    </div>
                                    <p>Укажите срок изготовления и стоимость.</p>
                                    <ul>
                                        {getBioPrices().map((item, index) => (
                                            <li key={index} className={styles.priceItem}>
                                                <span className={styles.priceLabel}>{item.label}</span>
                                                <div className={styles.price}>
                                                    <span>{item.price} ₽</span>
                                                </div>
                                                <button
                                                    className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                    onClick={() => handleSelectPrice(item.price, index, "bio", item.label)}
                                                >
                                                    Выбрать
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {shouldShowOldCard() && (
                                <div className={`${styles.passportBox} ${errors.service ? styles.error : ''}`}>
                                    <div className={styles.passportHeader}>
                                        <h3>Загранпаспорт старого образца</h3>
                                        <FaFingerprint className={styles.passportIcon}/>
                                    </div>
                                    <p>Укажите срок изготовления и стоимость.</p>
                                    <ul>
                                        {getOldPrices().map((item, index) => (
                                            <li key={index} className={styles.priceItem}>
                                                <span className={styles.priceLabel}>{item.label}</span>
                                                <div className={styles.price}>
                                                    <span>{item.price} ₽</span>
                                                </div>
                                                <button
                                                    className={`${styles.selectButton} ${selectedOldIndex === index ? styles.selected : ""}`}
                                                    onClick={() => handleSelectPrice(item.price, index, "old", item.label)}
                                                >
                                                    Выбрать
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {shouldShowRuPassportCard() && (
                                <div className={`${styles.passportBox} ${errors.service ? styles.error : ''}`}>
                                    <div className={styles.passportHeader}>
                                        <h3>Российский паспорт для граждан РФ</h3>
                                        <FaFingerprint className={styles.passportIcon}/>
                                    </div>
                                    <p>Укажите срок изготовления и стоимость.</p>
                                    <ul>
                                        {ruPassportPrices.map((item, index) => (
                                            <li key={index} className={styles.priceItem}>
                                                <span className={styles.priceLabel}>{item.label}</span>
                                                <div className={styles.price}>
                                                    <span>{item.price} ₽</span>
                                                </div>
                                                <button
                                                    className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                    onClick={() => handleSelectPrice(item.price, index, "rupassport", item.label)}
                                                >
                                                    Выбрать
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {shouldShowCriminalRecordCard() && (
                                <div className={`${styles.passportBox} ${errors.service ? styles.error : ''}`}>
                                    <div className={styles.passportHeader}>
                                        <h3>Справка о наличии/отсутствии судимости</h3>
                                        <FaFingerprint className={styles.passportIcon}/>
                                    </div>
                                    <p>Укажите срок изготовления и стоимость.</p>
                                    <ul>
                                        {criminalRecordPrices.map((item, index) => (
                                            <li key={index} className={styles.priceItem}>
                                                <span className={styles.priceLabel}>{item.label}</span>
                                                <div className={styles.price}>
                                                    <span>{item.price} ₽</span>
                                                </div>
                                                <button
                                                    className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                    onClick={() => handleSelectPrice(item.price, index, "criminal", item.label)}
                                                >
                                                    Выбрать
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    {selectedBioIndex !== null && (
                                        <div className={styles.apostilToggle}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={needApostil}
                                                    onChange={handleApostilToggle}
                                                />
                                                Добавить апостиль (+12000 ₽ + 1-2 раб. дня)
                                            </label>
                                        </div>
                                    )}
                                </div>
                            )}

                            {shouldShowApostilCard() && (
                                <div className={`${styles.passportBox} ${errors.service ? styles.error : ''}`}>
                                    <div className={styles.passportHeader}>
                                        <h3>Апостиль документов</h3>
                                        <FaFingerprint className={styles.passportIcon}/>
                                    </div>
                                    <p>Укажите срок изготовления и стоимость.</p>
                                    <ul>
                                        {apostilPrices.map((item, index) => (
                                            <li key={index} className={styles.priceItem}>
                                                <span className={styles.priceLabel}>{item.documentType}</span>
                                                <div className={styles.price}>
                                                    <span>{item.price} ₽</span>
                                                    <span className={styles.priceNote}>{item.label}</span>
                                                </div>
                                                <button
                                                    className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                    onClick={() => handleSelectPrice(item.price, index, "apostil", item.label)}
                                                >
                                                    Выбрать
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {errors.service && (
                            <div className={styles.errorText}>{errors.service}</div>
                        )}

                        {totalPrice > 0 && (
                            <div className={styles.totalPrice}>
                                Итого: {totalPrice} ₽
                                {selectedPassportType === 'Справка о наличии/отсутствии судимости' && needApostil && (
                                    <span className={styles.apostilNote}> (включая апостиль)</span>
                                )}
                                {selectedPassportType !== 'Справка о наличии/отсутствии судимости' && selectedPassportType !== 'Апостиль документов' && (
                                    <span className={styles.apostilNote}> (госпошлина не включена)</span>
                                )}
                            </div>
                        )}

                        <div className={styles.contactContainer}>
                            <div className={styles.contactForm}>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.row}>
                                        <div className={styles.inputWrapper}>
                                            <label htmlFor="name">Имя *</label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Имя *"
                                                className={styles.inputField}
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                        </div>

                                        <div className={styles.inputWrapper}>
                                            <label htmlFor="phone">Номер телефона *</label>
                                            <IMaskInput
                                                id="phone"
                                                mask="+7 (000) 000-00-00"
                                                unmask={false}
                                                type="tel"
                                                name="phone"
                                                placeholder="+7 (999) 999-99-99"
                                                className={styles.inputField}
                                                value={formData.phone}
                                                onAccept={handlePhoneChange}
                                            />
                                            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                        </div>
                                    </div>

                                    <div className={styles.contactActions}>
                                        <label className={styles.checkboxLabel} htmlFor="consent">
                                            <input
                                                id="consent"
                                                type="checkbox"
                                                name="consent"
                                                checked={formData.consent}
                                                onChange={handleInputChange}
                                            />
                                            Соглашаюсь с обработкой персональных данных
                                        </label>
                                        {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
                                    </div>

                                    <button className={styles.submitButton} type="submit">
                                        Отправить заявку
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {isSuccessPopupOpen && (
                <div className={styles.popupOverlay}>
                    <motion.div 
                        className={styles.popup}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <h3>Заявка отправлена!</h3>
                        <p>С Вами свяжутся в ближайшее время.</p>
                        <button className={styles.popupButton} onClick={handleSuccessPopupClose}>
                            ОК
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default Modal;
