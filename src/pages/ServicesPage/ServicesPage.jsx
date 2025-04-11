import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './ServicesPage.module.css';

function ServicesPage() {
    const services = [
        {
            id: 'zagranpasport-srochno-nedorogo',
            title: 'Загранпаспорт срочно',
            description: 'Содействие в ускоренном получении заграничного паспорта. VisaLand выступает посредником и оказывает содействие в срочном оформлении загранпаспорта в Москве.',
            price: 'от 23 000 ₽'
        },
        {
            id: 'rossiyskiy-pasport',
            title: 'Российский паспорт для граждан РФ, в срочном порядке',
            description: 'Мы окажем содействие в срочном получении, восстановлении или замене российского паспорта, независимо от места прописки, регистрации или фактического проживания.',
            price: 'от 25 000 ₽'
        },
        {
            id: 'spravka-ob-otsustvii-sudimosti',
            title: 'Справка о наличии/отсутствии судимости',
            description: 'Мы поможем сдать и получить справку (по нотариальной доверенности на нашего сотрудника). Сделаем все в короткие сроки, апостилируем, переведем на нужный язык и отправим клиенту.',
            price: 'от 10 000 ₽'
        },
        {
            id: 'oformlenie-zagranpasporta-na-rebenka',
            title: 'Загранпаспорт для детей срочно',
            description: 'Мы поможем в оформлении загранпаспорта для ребенка',
            price: 'от 23 000 ₽'
        },
        {
            id: 'zagranpasport-bez-registratsii-v-moskve',
            title: 'Оформить и получить загранпаспорт без регистрации в Москве',
            description: 'Не уверены, есть ли возможность получить загранпаспорт в Москве без прописки и регистрации? Специалисты нашей Консульской Службы с удовольствием Вам помогут!',
            price: 'от 23 000 ₽'
        },
        {
            id: 'zagranpassport-debt',
            title: 'Загранпаспорт с задолжностями',
            description: 'Поможем получить загранпаспорт даже при наличии задолженностей. Наши специалисты знают все особенности оформления загранпаспорта для граждан с задолженностями и помогут решить эту проблему в кратчайшие сроки.',
            price: 'от 60 000 ₽'
        },
        {
            id: 'apostil',
            title: 'Срочный апостиль документов',
            description: 'Услуги по проставлению апостиля на различные документы для их использования за границей.',
            price: 'от 11 000 ₽'
        },
        {
            id: 'zagranpasport-bez-voennogo-bileta',
            title: 'Загранпаспорт без военного билета',
            description: 'Вам предстоит поездка в другую страну и нужен загранпаспорт? Получите загранпаспорт без военного билета всего за 4 шага, без очередей и бюрократических задержек!',
            price: 'от 60 000 ₽'
        },
    ];

    return (
        <div className={styles.servicesPage}>
            <div className="container">
                <h1 className={styles.title}>Наши услуги</h1>
                <p className={styles.description}>
                    Мы предлагаем профессиональную помощь в оформлении различных документов. 
                    Наши специалисты обеспечат быстрое и качественное оформление всех необходимых бумаг.
                </p>
                
                <div className={styles.cardsGrid}>
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ServicesPage;