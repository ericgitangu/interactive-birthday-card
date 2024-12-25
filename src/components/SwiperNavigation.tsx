import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperNavigationProps {
    children: React.ReactNode;
}

const SwiperNavigation: React.FC<SwiperNavigationProps> = ({ children }) => {
    // Ensure children is always an array
    const childrenArray = React.Children.toArray(children);

    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            style={{ width: '100%', height: '100vh' }}
            allowTouchMove={false}
        >
            {childrenArray.map((child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperNavigation;
