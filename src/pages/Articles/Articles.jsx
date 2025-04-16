import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Articles.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Articles() {
    const [expandedArticle, setExpandedArticle] = useState(null);
    const articleRefs = useRef({});

    const scrollToArticle = (articleId) => {
        const articleElement = articleRefs.current[articleId];
        if (articleElement) {
            const headerHeight = 80; // Высота шапки
            const yOffset = -headerHeight;
            const y = articleElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            // Плавный скролл с учетом мобильных устройств
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

    const toggleArticle = (articleId) => {
        if (expandedArticle === articleId) {
            setExpandedArticle(null);
        } else {
            setExpandedArticle(articleId);
            // Добавляем небольшую задержку для корректной работы на мобильных
            setTimeout(() => scrollToArticle(articleId), 100);
        }
    };

    const articles = [
        {
            id: 1,
            title: 'Загранпаспорт: виды, сроки и особенности получения',
            serviceId: 'oformlenie-zagranpasporta',
            content: `
                <h2>Виды загранпаспортов</h2>
                <p>
                    В России существует два вида загранпаспортов:
                </p>
                <ul>
                    <li><strong>Биометрический загранпаспорт</strong> - содержит электронный чип с биометрическими данными владельца</li>
                    <li><strong>Загранпаспорт старого образца</strong> - классический вариант без электронного чипа</li>
                </ul>

                <h2>Сроки действия</h2>
                <ul>
                    <li>Биометрический загранпаспорт - 10 лет для взрослых, 5 лет для детей</li>
                    <li>Загранпаспорт старого образца - 5 лет для всех категорий граждан</li>
                </ul>

                <h2>Особенности получения</h2>
                <p>
                    Для получения загранпаспорта необходимо:
                </p>
                <ul>
                    <li>Подготовить необходимый пакет документов</li>
                    <li>Оплатить госпошлину</li>
                    <li>Подать заявление через МФЦ или портал Госуслуги</li>
                    <li>Дождаться изготовления документа</li>
                </ul>

                <h2>Сроки изготовления</h2>
                <p>
                    Стандартные сроки изготовления:
                </p>
                <ul>
                    <li>По месту жительства - до 1 месяца</li>
                    <li>По месту пребывания - до 3 месяцев</li>
                    <li>В особых случаях - до 3 дней</li>
                </ul>

                <h2>Необходимые документы</h2>
                <p>
                    Для оформления загранпаспорта потребуются:
                </p>
                <ul>
                    <li>Паспорт гражданина РФ</li>
                    <li>Фотографии установленного образца</li>
                    <li>Квитанция об оплате госпошлины</li>
                    <li>Военный билет (для мужчин 18-27 лет)</li>
                    <li>Трудовая книжка или её копия</li>
                    <li>Справка с места работы</li>
                </ul>

                <h2>Особые случаи</h2>
                <p>
                    В некоторых случаях могут потребоваться дополнительные документы:
                </p>
                <ul>
                    <li>Для детей до 14 лет - свидетельство о рождении и паспорт родителя</li>
                    <li>При смене фамилии - документы, подтверждающие смену фамилии</li>
                    <li>При наличии судимости - справка о судимости</li>
                    <li>При отсутствии регистрации - документы, подтверждающие место пребывания</li>
                </ul>

                <h2>Стоимость оформления</h2>
                <p>
                    Стоимость оформления загранпаспорта складывается из:
                </p>
                <ul>
                    <li>Госпошлина за изготовление паспорта</li>
                    <li>Стоимость фотографий</li>
                    <li>Стоимость копий документов</li>
                    <li>Дополнительные расходы при необходимости срочного оформления</li>
                </ul>
            `
        },
        {
            id: 2,
            title: 'Справка об отсутствии (наличии) судимости: для чего нужна и как получить',
            serviceId: 'spravka-ob-otsutstvii-sudimosti',
            content: `
                <h2>Что такое справка о судимости</h2>
                <p>
                    Справка о наличии (отсутствии) судимости — это официальный документ, 
                    который подтверждает наличие или отсутствие у гражданина непогашенной или
                    неснятой судимости. Полное название документа — «Справка о наличии 
                    (отсутствии) судимости и (или) факта уголовного преследования либо о 
                    прекращении уголовного преследования».
                </p>
            
                <h2>Для чего нужна справка о судимости</h2>
                <p>
                    Справка о судимости может потребоваться в следующих случаях:
                </p>
                <ul>
                    <li>При трудоустройстве на определенные должности</li>
                    <li>Для оформления визы или вида на жительство</li>
                    <li>При усыновлении, опеке или попечительстве</li>
                    <li>Для оформления лицензии на оружие</li>
                    <li>При получении гражданства другого государства</li>
                </ul>

                <h2>Способы получения справки</h2>
                <p>
                    Получить справку о судимости можно несколькими способами:
                </p>
                <ul>
                    <li>Лично в отделении МВД</li>
                    <li>Через портал Госуслуги</li>
                    <li>В МФЦ</li>
                    <li>Через доверенное лицо</li>
                </ul>

                <h2>Сроки изготовления</h2>
                <p>
                    Стандартные сроки изготовления справки:
                </p>
                <ul>
                    <li>При личном обращении - до 30 дней</li>
                    <li>Через Госуслуги - до 30 дней</li>
                    <li>В МФЦ - до 30 дней</li>
                    <li>Срочное изготовление - от 1 до 3 дней</li>
                </ul>

                <h2>Необходимые документы</h2>
                <p>
                    Для получения справки потребуются:
                </p>
                <ul>
                    <li>Паспорт гражданина РФ</li>
                    <li>Заявление установленного образца</li>
                    <li>Квитанция об оплате госпошлины (при необходимости)</li>
                    <li>Доверенность (при получении через представителя)</li>
                </ul>

                <h2>Особенности использования за границей</h2>
                <p>
                    При использовании справки за границей может потребоваться:
                </p>
                <ul>
                    <li>Апостиль на документ</li>
                    <li>Нотариальный перевод</li>
                    <li>Дополнительное заверение</li>
                </ul>
            `
        },
        {
            id: 3,
            title: 'Загранпаспорт без военного билета: особенности оформления',
            serviceId: 'oformlenie-zagranpasporta-bez-voennogo-bileta',
            content: `
                <h2>Особенности оформления загранпаспорта без военного билета</h2>
                <p>
                    Получение загранпаспорта без военного билета имеет свои особенности и требует 
                    специального подхода. Мы поможем вам оформить документ даже в сложных случаях.
                </p>

                <h2>Когда требуется оформление без военного билета</h2>
                <ul>
                    <li>При утере военного билета</li>
                    <li>Если военный билет не был получен</li>
                    <li>При наличии задолженности по военной службе</li>
                    <li>В случае проблем с военным комиссариатом</li>
                </ul>

                <h2>Необходимые документы</h2>
                <ul>
                    <li>Паспорт гражданина РФ</li>
                    <li>Фотографии установленного образца</li>
                    <li>Документы, подтверждающие причину отсутствия военного билета</li>
                    <li>Дополнительные справки при необходимости</li>
                </ul>

                <h2>Сроки оформления</h2>
                <p>
                    Сроки получения загранпаспорта без военного билета могут быть увеличены 
                    из-за необходимости дополнительных проверок и согласований.
                </p>
            `
        },
        {
            id: 4,
            title: 'Загранпаспорт с задолженностями: как получить',
            serviceId: 'oformlenie-zagranpasporta-s-zadolzhennostyami',
            content: `
                <h2>Оформление загранпаспорта при наличии задолженностей</h2>
                <p>
                    Наличие задолженностей не является абсолютным препятствием для получения 
                    загранпаспорта. Мы поможем вам решить эту проблему.
                </p>

                <h2>Виды задолженностей</h2>
                <ul>
                    <li>Налоговые задолженности</li>
                    <li>Задолженности по кредитам</li>
                    <li>Задолженности по алиментам</li>
                    <li>Судебные задолженности</li>
                </ul>

                <h2>Возможные решения</h2>
                <ul>
                    <li>Реструктуризация задолженности</li>
                    <li>Заключение мирового соглашения</li>
                    <li>Получение отсрочки платежей</li>
                    <li>Другие законные способы решения проблемы</li>
                </ul>
            `
        },
        {
            id: 5,
            title: 'Загранпаспорт на ребенка: особенности оформления',
            serviceId: 'oformlenie-zagranpasporta-na-rebenka',
            content: `
                <h2>Оформление загранпаспорта для ребенка</h2>
                <p>
                    Получение загранпаспорта для ребенка требует особого внимания и соблюдения 
                    всех необходимых формальностей.
                </p>

                <h2>Необходимые документы</h2>
                <ul>
                    <li>Свидетельство о рождении ребенка</li>
                    <li>Паспорта родителей</li>
                    <li>Фотографии ребенка</li>
                    <li>Согласие второго родителя (если требуется)</li>
                </ul>

                <h2>Особенности оформления</h2>
                <ul>
                    <li>Для детей до 14 лет - только биометрический паспорт</li>
                    <li>Срок действия - 5 лет</li>
                    <li>Необходимость присутствия ребенка при подаче документов</li>
                    <li>Особые требования к фотографиям</li>
                </ul>
            `
        },
        {
            id: 6,
            title: 'Российский паспорт: замена и получение',
            serviceId: 'oformlenie-rossiyskogo-pasporta',
            content: `
                <h2>Получение и замена российского паспорта</h2>
                <p>
                    Российский паспорт - основной документ, удостоверяющий личность гражданина РФ. 
                    Мы поможем вам получить или заменить паспорт в любых ситуациях.
                </p>

                <h2>Когда требуется замена паспорта</h2>
                <ul>
                    <li>По достижении 20 и 45 лет</li>
                    <li>При изменении фамилии, имени, отчества</li>
                    <li>При изменении пола</li>
                    <li>При порче или утере документа</li>
                </ul>

                <h2>Необходимые документы</h2>
                <ul>
                    <li>Старый паспорт (при замене)</li>
                    <li>Фотографии установленного образца</li>
                    <li>Документы, подтверждающие основания для замены</li>
                    <li>Квитанция об оплате госпошлины</li>
                </ul>
            `
        },
        {
            id: 7,
            title: 'Апостиль документов: что это и как получить',
            serviceId: 'apostil-dokumentov',
            content: `
                <h2>Что такое апостиль</h2>
                <p>
                    Апостиль - это специальный штамп, который удостоверяет подлинность документа 
                    для использования в странах-участницах Гаагской конвенции.
                </p>

                <h2>Какие документы требуют апостиль</h2>
                <ul>
                    <li>Свидетельства о рождении, браке, разводе</li>
                    <li>Дипломы об образовании</li>
                    <li>Справки о судимости</li>
                    <li>Судебные решения</li>
                    <li>Другие официальные документы</li>
                </ul>

                <h2>Процесс получения апостиля</h2>
                <ul>
                    <li>Подготовка документов</li>
                    <li>Подача в уполномоченный орган</li>
                    <li>Ожидание проставления апостиля</li>
                    <li>Получение заверенных документов</li>
                </ul>
            `
        }
    ];

    return (
        <div className={styles.articlesPage}>
            <div className="container">
                <h1 className={styles.title}>Статьи</h1>
                <p className={styles.description}>
                    Полезная информация о документах и их оформлении
                </p>

                <div className={styles.articlesList}>
                    {articles.map((article) => (
                        <div 
                            key={article.id} 
                            className={styles.articleCard}
                            ref={el => articleRefs.current[article.id] = el}
                        >
                            <div 
                                className={styles.articleHeader}
                                onClick={() => toggleArticle(article.id)}
                            >
                                <h2 className={styles.articleTitle}>{article.title}</h2>
                                {expandedArticle === article.id ? 
                                    <ChevronUp className={styles.chevronIcon} /> : 
                                    <ChevronDown className={styles.chevronIcon} />
                                }
                            </div>
                            
                            {expandedArticle === article.id && (
                                <>
                                    <div 
                                        className={styles.articleContent}
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                    />
                                    <div className={styles.articleFooter}>
                                        <a 
                                            href="http://visaland.ru/service.html"
                                            className={styles.orderButton}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Заказать услугу
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 