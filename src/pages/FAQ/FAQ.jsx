import React, { useState, useEffect } from 'react';
import styles from './FAQ.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ContactModal from '../../components/ContactModal/ContactModal';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        // Глобальная функция для открытия модального окна из любого места
        window.openContactModal = () => setModalOpen(true);
        
        return () => {
            // Очищаем при размонтировании компонента
            window.openContactModal = undefined;
        };
    }, []);
    
    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    
    const faqItems = [
        {
            question: 'Какие документы нужны для оформления загранпаспорта?',
            answer: 'Для оформления загранпаспорта необходимы следующие документы: российский паспорт, старый загранпаспорт (если имеется), фотографии установленного образца, квитанция об оплате госпошлины. Для биометрического загранпаспорта требуется личное присутствие для сдачи биометрических данных.'
        },
        {
            question: 'Сколько времени занимает оформление загранпаспорта?',
            answer: 'Стандартный срок оформления загранпаспорта старого образца составляет около 1 месяца, а биометрического - до 3 месяцев. При оформлении в ускоренном порядке сроки могут составлять от 5 до 15 рабочих дней в зависимости от типа паспорта и региона.'
        },
        {
            question: 'Можно ли получить загранпаспорт без военного билета?',
            answer: 'Да, получить загранпаспорт без военного билета возможно. Однако для мужчин призывного возраста могут быть определенные ограничения. В таких случаях необходимо получить справку из военкомата или иным способом подтвердить отсутствие ограничений на выезд за границу.'
        },
        {
            question: 'Что такое апостиль и когда он требуется?',
            answer: 'Апостиль - это международный штамп, который подтверждает подлинность документа для использования в странах-участницах Гаагской конвенции. Апостиль требуется, когда необходимо использовать российские документы за границей, например, при заключении брака, обучении, трудоустройстве или оформлении наследства в другой стране.'
        },
        {
            question: 'Что делать, если в загранпаспорте допущена ошибка?',
            answer: 'Если в выданном загранпаспорте обнаружена ошибка, необходимо обратиться в орган, выдавший паспорт, с заявлением о замене документа в связи с обнаруженной ошибкой. В большинстве случаев новый загранпаспорт будет оформлен бесплатно, если ошибка допущена по вине сотрудников государственных органов.'
        },
        {
            question: 'Могу ли я оформить загранпаспорт на ребенка без присутствия второго родителя?',
            answer: 'Да, загранпаспорт на ребенка может быть оформлен одним из родителей без присутствия второго. Однако для выезда ребенка за границу в сопровождении только одного родителя во многих случаях требуется нотариально заверенное согласие от второго родителя.'
        },
    ];
    
    return (
        <div className={styles.faqPage}>
            <div className="container">
                <h1 className={styles.title}>Часто задаваемые вопросы</h1>
                
                <div className={styles.faqContainer}>
                    <p className={styles.intro}>
                        Здесь вы найдете ответы на наиболее популярные вопросы о процессе оформления различных документов. 
                        Если вы не нашли ответ на свой вопрос, свяжитесь с нами по телефону<br />
                        <a href="tel:+74991363808"> +7 (499) 136-38-08</a>.
                    </p>
                    
                    <div className={styles.questions}>
                        {faqItems.map((item, index) => (
                            <div 
                                key={index} 
                                className={`${styles.questionItem} ${openIndex === index ? styles.open : ''}`}
                            >
                                <div 
                                    className={styles.questionHeader} 
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <h3 className={styles.questionText}>{item.question}</h3>
                                    <span className={styles.icon}>
                                        {openIndex === index ? 
                                            <ChevronUp size={20} /> : 
                                            <ChevronDown size={20} />
                                        }
                                    </span>
                                </div>
                                <div className={`${styles.answer} ${openIndex === index ? styles.visible : ''}`}>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className={styles.additionalInfo}>
                        <h2>Не нашли ответ на свой вопрос?</h2>
                        <p>
                            Наши специалисты готовы ответить на любые вопросы по оформлению документов.<br />
                            Свяжитесь с нами по телефону или оставьте заявку на сайте.
                        </p>
                        <div className={styles.actionButtons}>
                            <a href="tel:+74991363808" className={styles.callButton}>
                                Позвонить сейчас
                            </a>
                            <button onClick={() => setModalOpen(true)} className={styles.requestButton}>
                                Оставить заявку
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
} 