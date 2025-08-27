'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    // spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider03() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide-item">
                    {/*Start Government Voice Bottom Single */}
                    <div className="government-voice__bottom-single text-center">
                        <div className="date-box">
                            <h3><span className="icon-flag"></span> 2017</h3>
                        </div>
                        <p>Donec felis suscipit urna <br /> nulla at tincidunt.</p>
                    </div>
                    {/*End Government Voice Bottom Single */}
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    {/*Start Government Voice Bottom Single */}
                    <div className="government-voice__bottom-single text-center">
                        <div className="date-box">
                            <h3><span className="icon-flag"></span> 2018</h3>
                        </div>
                        <p>Donec felis suscipit urna <br /> nulla at tincidunt.</p>
                    </div>
                    {/*End Government Voice Bottom Single */}
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    {/*Start Government Voice Bottom Single */}
                    <div className="government-voice__bottom-single text-center">
                        <div className="date-box">
                            <h3><span className="icon-flag"></span> 2017</h3>
                        </div>
                        <p>Donec felis suscipit urna <br /> nulla at tincidunt.</p>
                    </div>
                    {/*End Government Voice Bottom Single */}
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    {/*Start Government Voice Bottom Single */}
                    <div className="government-voice__bottom-single text-center">
                        <div className="date-box">
                            <h3><span className="icon-flag"></span> 2018</h3>
                        </div>
                        <p>Donec felis suscipit urna <br /> nulla at tincidunt.</p>
                    </div>
                    {/*End Government Voice Bottom Single */}
                </SwiperSlide>
            </Swiper>
        </>
    )
}
