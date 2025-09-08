'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 0,
    autoplay: {
        delay: 3500,
        disableOnInteraction: true,
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
        // desktop ≥1024px
        1024: {
            slidesPerView: 4,
        },
        // tablet ≥768px
        768: {
            slidesPerView: 2,
        },
        // mobile <768px
        0: {
            slidesPerView: 1,
        },
    },

}

export default function Portfolio() {
    return (
        <>
            {/*Start Portfolio Style1 */}
            <section className="portfolio-style1">
                <div className="container-fluid">
                    <div className="row">
                        <Swiper {...swiperOptions} className="banner-carousel theme_carousel owl-theme">
                            <SwiperSlide>
                                <div className="portfolio-style1__single">
                                    <div className="portfolio-style1__single-img">
                                        <div className="inner">
                                            <img src="assets/images/resources/portfolio-v1-img1.jpg" alt="City Metro Train" />
                                            <div className="text-box">
                                                <p>Metro Train</p>
                                                <h2><Link href="#">City Metro Train</Link></h2>
                                            </div>
                                            <div className="portfolio-style1__link">
                                                <Link className="img-popup" href="assets/images/resources/portfolio-v1-img1.jpg">
                                                    <span className="icon-plus"></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="slide-item">
                        {/*Start Portfolio Style1 Single */}
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img2.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Tourist Guide</p>
                                            <h2><Link href="#">Main Tourist Spots</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img2.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/*End Portfolio Style1 Single */}
                            </SwiperSlide>
                            <SwiperSlide className="slide-item">
                        {/*Start Portfolio Style1 Single */}
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img3.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Golf day</p>
                                            <h2><Link href="#">Mayor Golf Day</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img3.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/*End Portfolio Style1 Single */}
                                </SwiperSlide>
                            <SwiperSlide className="slide-item">
                        {/*Start Portfolio Style1 Single */}
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img4.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Visit Museum</p>
                                            <h2><Link href="#">City Great Museum</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img4.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/* End Portfolio Style1 Single*/}
                            </SwiperSlide>
                            <SwiperSlide className="slide-item">
                        {/*Start Portfolio Style1 Single */}
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img2.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Tourist Guide</p>
                                            <h2><Link href="#">Main Tourist Spots</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img2.jpg"><span
                                                className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        {/*End Portfolio Style1 Single */}
                        </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            {/*End Portfolio Style1 */}
        </>
    )
}
