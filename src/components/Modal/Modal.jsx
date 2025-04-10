import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./Modal.module.css";
import {FaFingerprint} from "react-icons/fa";
import {IMaskInput} from "react-imask";
import { sendMessageToTelegram } from "../../utils/telegramAPI";

const Modal = ({ isOpen, onClose, serviceId }) => {
    // Значения по умолчанию в зависимости от услуги
    const getDefaultAge = () => {
        if (serviceId === 'viza') {
            return "Дети до 14 лет";
        }
        return "Взрослые и подростки от 14 лет";
    };

    const getDefaultResidence = () => {
        if (serviceId === 'inn') {
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
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", consent: true });
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePhone = (phone) => phone.replace(/\D/g, "").length === 11;

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
        { label: "10 раб. дней", price: 47000 },
        { label: "15 раб. дней", price: 40000 },
        { label: "30 раб. дней", price: 35000 },
        { label: "45 раб. дней", price: 30000 },
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

    // Функция для получения нужного массива цен в зависимости от возраста
    const getBioPrices = () => (selectedAge === "Дети до 14 лет" ? bioPricesChild : bioPricesAdult);
    const getOldPrices = () => (selectedAge === "Дети до 14 лет" ? oldPricesChild : oldPricesAdult);

    const handleResidenceClick = (residence) => {
        setSelectedResidence(residence);
    };

    // Изменение возраста
    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
        setSelectedBioIndex(null);
        setSelectedOldIndex(null);
        setTotalPrice(0);
        setSelectedPassportType("");
        setSelectedDuration("");
    };

    const handleSelectPrice = (basePrice, index, type, duration) => {
        let updatedPrice = basePrice;

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
        }
        
        setSelectedDuration(duration);
        setTotalPrice(updatedPrice);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (name === "name") {
            setErrors((prev) => ({
                ...prev,
                name: value.length >= 2 ? "" : "Имя должно содержать минимум 2 символа",
            }));
        }

        if (name === "email") {
            setErrors((prev) => ({
                ...prev,
                email: validateEmail(value) ? "" : "Введите корректный email",
            }));
        }

        if (name === "phone") {
            setErrors((prev) => ({
                ...prev,
                phone: validatePhone(value) ? "" : "Введите корректный номер телефона",
            }));
        }

        if (name === "consent") {
            setErrors((prev) => ({
                ...prev,
                consent: checked ? "" : "Вы должны согласиться с обработкой данных",
            }));
        }
    };

    const isFormValid =
        formData.name &&
        formData.phone &&
        formData.consent &&
        selectedPassportType !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPassportType || !selectedDuration) {
            setErrors((prev) => ({
                ...prev,
                passportType: "Выберите тип паспорта и срок изготовления",
            }));
            return;
        }

        setErrors((prev) => ({ ...prev, passportType: "" }));

        const formDataToSend = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            passportType: selectedPassportType,
            duration: selectedDuration,
            residence: selectedResidence,
            age: selectedAge,
            totalPrice: totalPrice,
            serviceId: serviceId
        };

        try {
            const success = await sendMessageToTelegram(formDataToSend);

            if (success) {
                setIsPopupOpen(true);
                setFormData({ name: "", phone: "", email: "", consent: true });
                setTotalPrice(0);
            } else {
                alert("Ошибка при отправке заявки.");
            }
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
        }
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        onClose();
        setFormData({ name: "", phone: "", email: "", consent: true });
        setTotalPrice(0);
    };

    // Определяем, какие карточки показывать в зависимости от типа услуги
    const shouldShowBioCard = () => {
        // Показываем для загранпаспортов и без военного билета
        return serviceId !== 'rupassport' && serviceId !== 'spravka-sudimost' && serviceId !== 'apostil';
    };

    const shouldShowOldCard = () => {
        // Показываем для загранпаспортов и без военного билета
        return serviceId !== 'rupassport' && serviceId !== 'spravka-sudimost' && serviceId !== 'apostil';
    };

    const shouldShowRuPassportCard = () => {
        return serviceId === 'rupassport';
    };

    const shouldShowCriminalRecordCard = () => {
        return serviceId === 'spravka-sudimost';
    };

    const shouldShowApostilCard = () => {
        return serviceId === 'apostil';
    };

    const shouldShowAgeSelect = () => {
        // Показываем выбор возраста только для определенных услуг
        return serviceId !== 'rupassport' && serviceId !== 'spravka-sudimost' && serviceId !== 'apostil';
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.9}}
                className={styles.modal}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={24}/>
                </button>

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
                            <select id="age" value={selectedAge} className={styles.select} onChange={handleAgeChange}>
                                <option>Взрослые и подростки от 14 лет</option>
                                <option>Дети до 14 лет</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className={styles.passportContainer}>
                    {shouldShowBioCard() && (
                        <div className={styles.passportBox}>
                            <div className={styles.passportHeader}>
                                <h3>Биометрический загранпаспорт</h3>
                                <FaFingerprint className={styles.passportIcon}/>
                            </div>
                            <p>Укажите срок изготовления и стоимость.</p>
                            <ul>
                                {getBioPrices().map((item, index) => {
                                    return (
                                        <li key={index} className={styles.priceItem}>
                                            <span className={styles.priceLabel}>{item.label}</span>
                                            <span className={styles.price}>{item.price} ₽</span>
                                            <button
                                                className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                onClick={() => handleSelectPrice(item.price, index, "bio", item.label)}
                                            >
                                                Выбрать
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {shouldShowOldCard() && (
                        <div className={styles.passportBox}>
                            <div className={styles.passportHeader}>
                                <h3>Загранпаспорт старого образца</h3>
                                <FaFingerprint className={styles.passportIcon}/>
                            </div>
                            <p>Укажите срок изготовления и стоимость.</p>
                            <ul>
                                {getOldPrices().map((item, index) => {
                                    return (
                                        <li key={index} className={styles.priceItem}>
                                            <span className={styles.priceLabel}>{item.label}</span>
                                            <span className={styles.price}>{item.price} ₽</span>
                                            <button
                                                className={`${styles.selectButton} ${selectedOldIndex === index ? styles.selected : ""}`}
                                                onClick={() => handleSelectPrice(item.price, index, "old", item.label)}
                                            >
                                                Выбрать
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {shouldShowRuPassportCard() && (
                        <div className={styles.passportBox}>
                            <div className={styles.passportHeader}>
                                <h3>Российский паспорт для граждан РФ</h3>
                                <FaFingerprint className={styles.passportIcon}/>
                            </div>
                            <p>Укажите срок изготовления и стоимость.</p>
                            <ul>
                                {ruPassportPrices.map((item, index) => {
                                    return (
                                        <li key={index} className={styles.priceItem}>
                                            <span className={styles.priceLabel}>{item.label}</span>
                                            <span className={styles.price}>{item.price} ₽ + госпошлина</span>
                                            <button
                                                className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                onClick={() => handleSelectPrice(item.price, index, "rupassport", item.label)}
                                            >
                                                Выбрать
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {shouldShowCriminalRecordCard() && (
                        <div className={styles.passportBox}>
                            <div className={styles.passportHeader}>
                                <h3>Справка о наличии/отсутствии судимости</h3>
                                <FaFingerprint className={styles.passportIcon}/>
                            </div>
                            <p>Укажите срок изготовления и стоимость.</p>
                            <ul>
                                {criminalRecordPrices.map((item, index) => {
                                    return (
                                        <li key={index} className={styles.priceItem}>
                                            <span className={styles.priceLabel}>{item.label}</span>
                                            <span className={styles.price}>{item.price} ₽</span>
                                            <button
                                                className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                onClick={() => handleSelectPrice(item.price, index, "criminal", item.label)}
                                            >
                                                Выбрать
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {shouldShowApostilCard() && (
                        <div className={styles.passportBox}>
                            <div className={styles.passportHeader}>
                                <h3>Апостиль документов</h3>
                                <FaFingerprint className={styles.passportIcon}/>
                            </div>
                            <p>Укажите срок изготовления и стоимость.</p>
                            <ul>
                                {apostilPrices.map((item, index) => {
                                    return (
                                        <li key={index} className={styles.priceItem}>
                                            <span className={styles.priceLabel}>{item.documentType}</span>
                                            <span className={styles.priceLabel}>{item.label}</span>
                                            <span className={styles.price}>{item.price} ₽</span>
                                            <button
                                                className={`${styles.selectButton} ${selectedBioIndex === index ? styles.selected : ""}`}
                                                onClick={() => handleSelectPrice(item.price, index, "apostil", item.label)}
                                            >
                                                Выбрать
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.contactContainer}>
                    <div className={styles.firstContactContainer}>
                        <div className={styles.contactForm}>
                            <div className={styles.row}>
                                {/* Имя */}
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
                                        required
                                    />
                                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                </div>

                                {/* Телефон с маской */}
                                <div className={styles.inputWrapper}>
                                    <label htmlFor="phone">Номер телефона *</label>
                                    <IMaskInput
                                        id="phone"
                                        mask="+7 (000) 000-00-00"
                                        unmask={true}
                                        type="tel"
                                        name="phone"
                                        placeholder="+7 (999) 999-99-99"
                                        className={styles.inputField}
                                        value={formData.phone}
                                        onAccept={(value) => setFormData({...formData, phone: value})}
                                        onBlur={(e) => handleInputChange(e)}
                                        required
                                    />
                                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                </div>
                            </div>
                            </div>

                        {/* Чекбокс */}
                        <div className={styles.contactActions}>
                            <label className={styles.checkboxLabel} htmlFor="consent">
                                <input
                                    id="consent"
                                    type="checkbox"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleInputChange}
                                    required
                                />
                                Соглашаюсь с обработкой персональных данных
                            </label>
                            {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
                            </div>

                        {/* Кнопка отправки */}
                        <button className={styles.submitButton} disabled={!isFormValid} onClick={handleSubmit}>
                            Отправить заявку
                        </button>

                        {!selectedPassportType && !selectedDuration && (
                            <span className={styles.infoText}>Выберите тип паспорта и срок изготовления</span>
                        )}

                            </div>
                    <div className={styles.costCalculation}>
                        <h3>Расчет стоимости:</h3>
                        <p><strong>Тип услуги:</strong> {selectedPassportType || "Не выбран"}</p>
                        <p><strong>Срок выполнения:</strong> {selectedDuration || "Не выбран"}</p>
                        {shouldShowAgeSelect() && (
                            <p><strong>Возраст:</strong> {selectedAge || "Не указан"}</p>
                        )}
                        <p><strong>Регистрация:</strong> {selectedResidence || "Не выбрана"}</p>
                        <hr/>
                        <p className={styles.totalPrice}>{totalPrice} ₽</p>
                    </div>
                </div>
            </motion.div>

            {isPopupOpen && (
                <div className={styles.popupOverlay}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={styles.popup}
                    >
                        <h3>Заявка отправлена!</h3>
                        <p>С Вами свяжутся в ближайшее время.</p>
                        <button className={styles.popupButton} onClick={handlePopupClose}>
                            ОК
                        </button>
                    </motion.div>
            </div>
            )}
        </div>
    );
};

export default Modal;