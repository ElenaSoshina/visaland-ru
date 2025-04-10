import React from 'react';
import styles from './ServicesSection.module.css';
import {Link} from "react-router-dom";
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
        },
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Чем мы можем Вам помочь</h2>
                <div className={styles.cards}>
                    {services.map((service, index) => (
                        <Link key={index} to={`/service/${service.id}.html`} className={styles.cardLink}>
                            <div className={styles.card}>
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
