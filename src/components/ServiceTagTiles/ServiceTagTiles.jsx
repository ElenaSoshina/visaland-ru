import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ServiceTagTiles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ServiceTagTiles = ({ currentServiceId }) => {
    const services = [
        {
            id: 'zagranpassport',
            title: 'Загранпаспорт срочно'
        },
        {
            id: 'rupassport',
            title: 'Российский паспорт для граждан РФ'
        },
        {
            id: 'spravka-sudimost',
            title: 'Справка о судимости'
        },
        {
            id: 'viza',
            title: 'Загранпаспорт для детей'
        },
        {
            id: 'apostil',
            title: 'Апостиль документов'
        },
        {
            id: 'passport-no-military',
            title: 'Загранпаспорт без военного билета'
        },
        {
            id: 'inn',
            title: 'Загранпаспорт без регистрации'
        },
        {
            id: 'snils',
            title: 'Загранпаспорт стандарт/биометрия'
        }
    ];

    // Фильтруем текущую услугу
    const otherServices = services.filter(service => service.id !== currentServiceId);
    
    return (
        <div className={styles.tagTilesContainer}>
            <h2 className={styles.sectionTitle}>Другие услуги</h2>
            <div className={styles.carouselContainer}>
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: `.${styles.swiperButtonNext}`,
                        prevEl: `.${styles.swiperButtonPrev}`
                    }}
                    loop={true}
                    watchOverflow={true}
                    spaceBetween={5}
                    slidesPerGroup={1}
                    className={styles.tagTilesCarousel}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 4
                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 5
                        },
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 5
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 5
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 5
                        }
                    }}
                >
                    {otherServices.map((service) => (
                        <SwiperSlide key={service.id} className={styles.slideWrapper}>
                            <Link 
                                to={`/${service.id}.html`} 
                                className={styles.tagTile}
                            >
                                {service.title}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className={`${styles.navButton} ${styles.swiperButtonPrev}`} aria-label="Предыдущая услуга">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className={`${styles.navButton} ${styles.swiperButtonNext}`} aria-label="Следующая услуга">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ServiceTagTiles; 