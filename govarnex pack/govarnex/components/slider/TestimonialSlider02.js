'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
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
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider02() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                    {/*Start Testimonials Style1 Single */}
                    <div className="testimonials-style1__single">
                        <div className="testimonials-style1__single-content">
                            <div className="rating-box">
                                <ul>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star"></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text">
                                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sit purus
                                    tempor dui. Pharetra consequat nibh elit urna interdum. Viverra quam a
                                    arcu duis. Quis lectus donec nulla
                                    dui sit in viverra tempus risus.”</p>
                            </div>
                        </div>

                        <div className="testimonials-style1__single-client-info">
                            <div className="img-box">
                                <img src="assets/images/testimonial/testimonial-v1-1.jpg" alt="#" />
                            </div>

                            <div className="text-box">
                                <h3>Sandra Bullock</h3>
                                <p>Manager </p>
                            </div>
                        </div>
                    </div>
                    {/*End Testimonials Style1 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Testimonials Style1 Single */}
                    <div className="testimonials-style1__single">
                        <div className="testimonials-style1__single-content">
                            <div className="rating-box">
                                <ul>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star"></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text">
                                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sit purus
                                    tempor dui. Pharetra consequat nibh elit urna interdum. Viverra quam a
                                    arcu duis. Quis lectus donec nulla
                                    dui sit in viverra tempus risus.”</p>
                            </div>
                        </div>

                        <div className="testimonials-style1__single-client-info">
                            <div className="img-box">
                                <img src="assets/images/testimonial/testimonial-v1-2.jpg" alt="#" />
                            </div>

                            <div className="text-box">
                                <h3>Sandra Bullock</h3>
                                <p>Manager </p>
                            </div>
                        </div>
                    </div>
                    {/*End Testimonials Style1 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Testimonials Style1 Single */}
                    <div className="testimonials-style1__single">
                        <div className="testimonials-style1__single-content">
                            <div className="rating-box">
                                <ul>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-pointed-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star"></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="text">
                                <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sit purus
                                    tempor dui. Pharetra consequat nibh elit urna interdum. Viverra quam a
                                    arcu duis. Quis lectus donec nulla
                                    dui sit in viverra tempus risus.”</p>
                            </div>
                        </div>

                        <div className="testimonials-style1__single-client-info">
                            <div className="img-box">
                                <img src="assets/images/testimonial/testimonial-v1-1.jpg" alt="#" />
                            </div>

                            <div className="text-box">
                                <h3>Sandra Bullock</h3>
                                <p>Manager </p>
                            </div>
                        </div>
                    </div>
                    {/*End Testimonials Style1 Single */}
                </SwiperSlide>
            </Swiper>
        </>
    )
}
