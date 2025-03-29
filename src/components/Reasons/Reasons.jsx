import React, { useState } from "react";
import styles from "./Reasons.module.css";
import { CheckCircle } from "lucide-react";

const reasons = [
    "Работаем по договору, поэтому вы уверены в нашей надежности и качестве услуг",
    "Всегда укладываемся в срок, потому что знаем насколько вам важно получить загранпаспорт и другие необходимые бумаги",
    "Нас поддерживают государственные органы и наши схемы работы полностью соответствуют действующему законодательству",
    "Помогаем заполнить документы с первого раза, поэтому процесс подготовки проходит намного быстрее, чем когда вы это делаете сами",
    "Наши документы всегда принимаются в государственных органах без очередей и задержек",
    "Оказываем поддержку и сопровождение на всех этапах, чтобы вы были спокойны за заказанные документы",
    "Решаем даже сложные вопросы, ведь у нас более 10 лет опыта оформления загранпаспортов и других бумаг",
    "Всегда прозрачные цены - подробно расписаны на каждой странице услуги",
    "Помогаем получить документы даже тем, у кого нет постоянной прописки в Москве",
    "Оформляем все документы, которые нужны для работы, жизни и путешествий, поэтому с нами очень удобно!"
];

function Reasons() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % reasons.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length);
    };

    const handleSwipe = (e) => {
        const touchStartX = e.touches[0].clientX;

        const handleTouchMove = (moveEvent) => {
            const touchEndX = moveEvent.touches[0].clientX;
            const swipeThreshold = 50;

            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
            }
            e.target.removeEventListener("touchmove", handleTouchMove);
        };

        e.target.addEventListener("touchmove", handleTouchMove);
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>10 причин, почему Вам понравится с нами работать:</h2>

            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {reasons.map((reason, index) => (
                        <div key={index} className={styles.card}>
                            <CheckCircle size={34} className={styles.icon} />
                            <p>{reason}</p>
                        </div>
                    ))}
                </div>

                <div
                    className={styles.slider}
                    onTouchStart={handleSwipe}
                >
                    <div className={styles.cardWrapper}>
                        <div className={styles.card}>
                            <CheckCircle size={34} className={styles.icon} />
                            <p>{reasons[currentSlide]}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.pagination}>
                {reasons.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.pageDot} ${currentSlide === index ? styles.activeDot : ""}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Reasons;
