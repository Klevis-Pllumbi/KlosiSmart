'use client'
import Link from "next/link"
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
            spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider05() {
    return (
        <>
            <Swiper {...swiperOptions} className="theme_carousel owl-theme">
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Group-18"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Find a Public Transport <br /> or Locate Parking</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Vector-1"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Pay any Utility Bill Easily by <br /> Access Account</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Group-18"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Find a Public Transport <br /> or Locate Parking</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Vector-1"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Pay any Utility Bill Easily by <br /> Access Account</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Group-18"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Find a Public Transport <br /> or Locate Parking</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
                <SwiperSlide className="slide">
                    {/*Start Departments Details Content Text5 Single */}
                    <div className="departments-details__content-text5-single">
                        <div className="icon-box">
                            <span className="icon-Vector-1"></span>
                        </div>
                        <div
                            className="departments-details__content-text5-single-inner clearfix">
                            <h3>Pay any Utility Bill Easily by <br /> Access Account</h3>
                            <div className="icon-holder">
                                <Link href="#"><span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    {/*End Departments Details Content Text5 Single */}
                </SwiperSlide>
            </Swiper>

        </>
    )
}
