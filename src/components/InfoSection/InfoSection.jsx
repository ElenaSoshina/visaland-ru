import React from 'react';
import { Link } from 'react-router-dom';
import styles from './InfoSection.module.css';
import { BookOpen, FileQuestion, FileText } from 'lucide-react';

export default function InfoSection() {
    const infoCards = [
        {
            id: 'useful-info',
            title: 'Полезная информация',
            description: 'Узнайте больше о процессе оформления документов и полезные советы',
            icon: <BookOpen className={styles.cardIcon} size={32} />,
            link: '/usefulinfo.html'
        },
        {
            id: 'faq',
            title: 'Часто задаваемые вопросы',
            description: 'Ответы на популярные вопросы наших клиентов',
            icon: <FileQuestion className={styles.cardIcon} size={32} />,
            link: '/faq.html'
        },
        {
            id: 'articles',
            title: 'Статьи',
            description: 'Экспертные статьи о получении документов и юридических аспектах',
            icon: <FileText className={styles.cardIcon} size={32} />,
            link: '/articles.html'
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Полезная информация</h2>
                <div className={styles.cards}>
                    {infoCards.map(card => (
                        <Link key={card.id} to={card.link} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}>
                                    {card.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDescription}>{card.description}</p>
                            </div>
                            <span className={styles.cardLink}>Подробнее →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
} 