import React from 'react';
import styles from './AboutPage.module.css';
import ContactAndReviews from '../../components/ContactAndReviews/ContactAndReviews';
import ContactSection from '../../components/ContactSection/ContactSection';
import { Users, CheckCircle, User, Building2, Clock, MapPin, Phone, Briefcase, Heart, Target } from 'lucide-react';

function AboutPage() {
    const teamMembers = [
        {
            position: 'НАЧАЛЬНИК ОТДЕЛА ОФОРМЛЕНИЯ ЗАГРАНПАСПОРТОВ И СПРАВОК О НЕСУДИМОСТИ'
        },
        {
            position: 'МЕНЕДЖЕР ОТДЕЛА ОФОРМЛЕНИЯ ЗАГРАНПАСПОРТОВ'
        },
        {
            position: 'МЕНЕДЖЕР ОТДЕЛА ОФОРМЛЕНИЯ СПРАВОК О НЕСУДИМОСТИ'
        }
    ];

    return (
        <div className={styles.aboutPage}>
            <div className={styles.container}>
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
                                    <p className={styles.teamPosition}>{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Блок: Наше агентство */}
                <section className={styles.agencySection}>
                    <h2 className={styles.sectionTitle}>
                        <Building2 className={styles.sectionIcon} size={28} />
                        Наше агентство
                    </h2>
                    
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>
                                <Briefcase className={styles.infoIcon} size={24} />
                                Кто мы такие?
                            </h3>
                            <p className={styles.infoText}>
                                Мы активное сообщество профессионалов своего дела. Наша компания помогает людям 
                                в решении вопросов с документами, полностью на легальной основе. Наша компания 
                                была основана в 2005 году и все это время мы успешно занимаемся данным видом деятельности.
                            </p>
                        </div>
                        
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>
                                <Heart className={styles.infoIcon} size={24} />
                                Почему с нами комфортно?
                            </h3>
                            <p className={styles.infoText}>
                                Чтобы сделать загранпаспорт срочно или другой документ, просто обратитесь к нам, 
                                все остальное сделаем мы; вы не платите лишнего и получаете ожидаемый результат - 
                                наши цены вас обрадуют.
                            </p>
                        </div>
                        
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>
                                <MapPin className={styles.infoIcon} size={24} />
                                Где мы?
                            </h3>
                            <p className={styles.infoText}>
                                Нас легко найти — офис компании находится в центре Москвы; вы всегда дозвонитесь 
                                на наш многоканальный номер, и получите грамотный ответ на любой вопрос.
                            </p>
                        </div>
                    </div>
                </section>

                <ContactAndReviews />
                <ContactSection />
            </div>
        </div>
    );
}

export default AboutPage;