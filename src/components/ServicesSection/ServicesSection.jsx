import React from 'react';
import styles from './ServicesSection.module.css';
import {Link} from "react-router-dom";
import { FaPassport, FaFileAlt, FaUserCheck } from 'react-icons/fa';
import '../../App.css'

export default function ServicesSection() {
    const services = [
        {
            id: 'zagranpassport',
            title: 'Содействие в ускоренном получении заграничного паспорта',
            deadline: 'Что входит в услугу:',
            list: [
                'сбор и оформление документов для загранпаспорта — 1 день',
                'подача без очередей в гос. органы — 1 день',
                'получение готового загранпаспорта — в среднем 10 дней',
            ],
            price: 'от 23 000 ₽',
            icon: FaPassport
        },
        {
            id: 'rupassport',
            title: 'Российский паспорт для граждан РФ, в срочном порядке',
            deadline: 'Что входит в услугу:',
            list: [
                'подготовка пакета документов для российского паспорта — 1 день',
                'сопровождение при подаче заявления — 1 день',
                'получение готового российского паспорта — 3 дня',
            ],
            price: 'от 35 000 ₽',
            icon: FaFileAlt
        },
        {
            id: 'spravka-sudimost',
            title: 'Справка о наличии/отсутствии судимости',
            deadline: 'Что входит в услугу:',
            list: [
                'оформление документов для получения справки — 1 день',
                'быстрая подача заявления без очередей — 1 день',
                'получение справки о судимости — 10 дней',
            ],
            price: 'от 10 000 ₽',
            icon: FaUserCheck
        },
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Чем мы можем Вам помочь</h2>
                <div className={styles.cards}>
                    {services.map((service, index) => (
                        <Link 
                            key={index}
                            to={`/${service.id}.html`} 
                            className={styles.serviceCard}
                        >
                            <div className={styles.card}>
                                <div className={styles.serviceIconContainer}>
                                    <service.icon className={styles.serviceIcon} />
                                </div>
                                <p className={styles.title}>{service.title}</p>
                                <p className={styles.subtitle}>{service.deadline}</p>
                                <ul className={styles.list}>
                                    {service.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className={styles.price}>Цена <span>{service.price}</span></div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.buttonWrapper}>
                    <Link to="/service.html" className={styles.allServicesButton}>
                        Все услуги
                    </Link>
                </div>
            </div>
        </section>
    );
}
