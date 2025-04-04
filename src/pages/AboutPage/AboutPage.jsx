import React from 'react';
import styles from './AboutPage.module.css';
import ContactAndReviews from '../../components/ContactAndReviews/ContactAndReviews';
import { Users, CheckCircle, User } from 'lucide-react';

function AboutPage() {
    const teamMembers = [
        {
            name: 'Алексей Тамбовцев',
            position: 'НАЧАЛЬНИК ОТДЕЛА ОФОРМЛЕНИЯ ЗАГРАНПАСПОРТОВ И СПРАВОК О НЕСУДИМОСТИ'
        },
        {
            name: 'Анна Сухомлинова',
            position: 'МЕНЕДЖЕР ОТДЕЛА ОФОРМЛЕНИЯ ЗАГРАНПАСПОРТОВ И СПРАВОК О НЕСУДИМОСТИ'
        },
        {
            name: 'Оксана Сорокина',
            position: 'МЕНЕДЖЕР ОТДЕЛА ОФОРМЛЕНИЯ ЗАГРАНПАСПОРТОВ И СПРАВОК О НЕСУДИМОСТИ'
        }
    ];

    return (
        <div className={styles.aboutPage}>
            <div className="container">
                <h1 className={styles.title}>О нас</h1>
                
                {/* Блок: Наша команда */}
                <section className={styles.teamSection}>
                    <h2 className={styles.sectionTitle}>
                        <Users className={styles.sectionIcon} size={28} />
                        Наша команда
                    </h2>
                    
                    <div className={styles.teamGrid}>
                        {teamMembers.map((member, index) => (
                            <div key={index} className={styles.teamCard}>
                                <div className={styles.teamIcon}>
                                    <User size={40} />
                                </div>
                                <div className={styles.teamInfo}>
                                    <h3 className={styles.teamName}>{member.name}</h3>
                                    <p className={styles.teamPosition}>{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Блок: Наше агентство */}
                <section className={styles.agencySection}>
                    <h2 className={styles.sectionTitle}>Наше агентство</h2>
                    
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Кто мы такие?</h3>
                        <p className={styles.infoText}>
                            Мы активное сообщество профессионалов своего дела. Наша компания помогает людям 
                            в решении вопросов с документами, полностью на легальной основе. Наша компания 
                            была основана в 2005 году и все это время мы успешно занимаемся данным видом деятельности.
                        </p>
                    </div>
                    
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Почему с нами комфортно?</h3>
                        <p className={styles.infoText}>
                            Чтобы сделать загранпаспорт срочно или другой документ, просто обратитесь к нам, 
                            все остальное сделаем мы; вы не платите лишнего и получаете ожидаемый результат - 
                            наши цены вас обрадуют.
                        </p>
                    </div>
                    
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Где мы?</h3>
                        <p className={styles.infoText}>
                            Нас легко найти — офис компании находится в центре Москвы; вы всегда дозвонитесь 
                            на наш многоканальный номер, и получите грамотный ответ на любой вопрос.
                        </p>
                    </div>
                    
                    <div className={styles.infoBlock}>
                        <h3 className={styles.infoTitle}>Почему еще с нами комфортно?</h3>
                        <ul className={styles.benefitsList}>
                            <li>
                                <CheckCircle className={styles.benefitIcon} size={20} />
                                <span>Каждый наш клиент бесплатно получает консультации, необходимые копии документов и фотографии.</span>
                            </li>
                            <li>
                                <CheckCircle className={styles.benefitIcon} size={20} />
                                <span>Наш общий опыт оформления документов более 30 лет.</span>
                            </li>
                            <li>
                                <CheckCircle className={styles.benefitIcon} size={20} />
                                <span>Рядом с нашим офисом есть парковка для автомобилей.</span>
                            </li>
                            <li>
                                <CheckCircle className={styles.benefitIcon} size={20} />
                                <span>Время оформления документов не превышает 15 минут.</span>
                            </li>
                            <li>
                                <CheckCircle className={styles.benefitIcon} size={20} />
                                <span>С нами удобно и надежно сотрудничать.</span>
                            </li>
                        </ul>
                    </div>
                </section>
                
                {/* Компонент с контактами и отзывами */}
                <ContactAndReviews />
            </div>
        </div>
    );
}

export default AboutPage;