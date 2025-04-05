import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/service/${service.id}.html`);
    };
    
    const handleButtonClick = (e) => {
        e.stopPropagation();
        navigate(`/service/${service.id}.html`);
    };
    
    return (
        <div className={styles.card} onClick={handleClick}>
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