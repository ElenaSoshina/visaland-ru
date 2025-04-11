import React from 'react';
import styles from './ReviewCard.module.css';

export default function ReviewCard({ name, date, text, rating, avatar }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {avatar ? (
                    <img src={avatar} alt={name} className={styles.avatar} />
                ) : (
                    <div className={styles.defaultAvatar}>
                        {name.charAt(0)}
                    </div>
                )}
                <div className={styles.info}>
                    <h4 className={styles.name}>{name}</h4>
                    <div className={styles.rating}>
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={styles.star}>
                                ★
                            </span>
                        ))}
                    </div>
                    <p className={styles.date}>{date}</p>
                </div>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    );
} 