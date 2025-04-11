import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServiceCard.module.css';
import { FaPassport, FaChild, FaClock, FaUserShield, FaFileAlt, FaUserTie, FaUserCheck, FaUserClock, FaUserTimes, FaUserLock, FaUserSecret, FaUserGraduate, FaUserCog, FaUserEdit, FaUserPlus, FaUserMinus, FaUserTag } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/${service.id}.html`);
    };
    
    const handleButtonClick = (e) => {
        e.stopPropagation();
        navigate(`/${service.id}.html`);
    };
    
    const getIcon = (id) => {
        switch (id) {
            case 'zagranpasport-srochno-nedorogo':
                return <FaPassport className={styles.serviceIcon} />;
            case 'zagranpasport-bez-registratsii-v-moskve':
                return <FaUserShield className={styles.serviceIcon} />;
            case 'zagranpassport-debt':
                return <FaUserTimes className={styles.serviceIcon} />;
            case 'zagranpasport-bez-voennogo-bileta':
                return <FaUserTie className={styles.serviceIcon} />;
            case 'oformlenie-zagranpasporta-na-rebenka':
                return <FaChild className={styles.serviceIcon} />;
            case 'rossiyskiy-pasport':
                return <FaFileAlt className={styles.serviceIcon} />;
            case 'spravka-ob-otsustvii-sudimosti':
                return <FaUserCheck className={styles.serviceIcon} />;
            case 'apostil':
                return <FaUserClock className={styles.serviceIcon} />;
            default:
                return null;
        }
    };
    
    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.serviceIconContainer}>
                {getIcon(service.id)}
            </div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>
            <div className={styles.price}>Стоимость: {service.price}</div>
            <button 
                className={styles.button} 
                onClick={handleButtonClick}
            >
                Подробнее
            </button>
        </div>
    );
};

export default ServiceCard; 