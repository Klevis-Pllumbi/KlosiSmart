'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
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
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider04() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                {/*Start single review box*/}
                <SwiperSlide className="column">
                    {/*Start Testimonials Style3 Content Single */}
                    <div className="testimonials-style3__content-single">
                        <div className="testimonials-style3__content-single-inner">
                            <div className="img-box">
                                <div className="inner">
                                    <img src="assets/images/testimonial/testimonial-v3-2.jpg" alt="" />
                                </div>
                                <div className="icon-box">
                                    <span className="icon-right-quotes-symbol"></span>
                                </div>
                            </div>
                            <div className="content-box">
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
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                                        sit
                                        purus
                                        tempor dui. Pharetra consequat nibh elit urna interdum. Viverra
                                        quam
                                        a
                                        arcu duis. Quis lectus donec nulla
                                        dui sit in viverra tempus risus.”</p>
                                </div>
                                <div className="client-info">
                                    <h3>Sandra Bullock</h3>
                                    <p>Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Testimonials Style3 Content Single*/}
                </SwiperSlide>
                {/*End single review box*/}
                {/*Start single review box*/}
                <SwiperSlide className="column">
                    {/*Start Testimonials Style3 Content Single */}
                    <div className="testimonials-style3__content-single">
                        <div className="testimonials-style3__content-single-inner">
                            <div className="img-box">
                                <div className="inner">
                                    <img src="assets/images/testimonial/testimonial-v3-2.jpg" alt="" />
                                </div>
                                <div className="icon-box">
                                    <span className="icon-right-quotes-symbol"></span>
                                </div>
                            </div>
                            <div className="content-box">
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
                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                                        sit
                                        purus
                                        tempor dui. Pharetra consequat nibh elit urna interdum. Viverra
                                        quam
                                        a
                                        arcu duis. Quis lectus donec nulla
                                        dui sit in viverra tempus risus.”</p>
                                </div>
                                <div className="client-info">
                                    <h3>Sandra Bullock</h3>
                                    <p>Manager</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Testimonials Style3 Content Single*/}
                </SwiperSlide>
                {/*End single review box*/}
            </Swiper>

        </>
    )
}
