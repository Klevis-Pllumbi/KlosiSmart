'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 0,
    autoplay: { delay: 3500, disableOnInteraction: true },
    loop: true,
    navigation: { nextEl: '.h1n', prevEl: '.h1p' },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
        1024: { slidesPerView: 4 }, // desktop
        768: { slidesPerView: 2 },  // tablet
        0: { slidesPerView: 1 },    // mobile
    },
}

export default function Portfolio() {
    return (
        <>
            {/*Start Portfolio Style1 */}
            <section className="portfolio-style1" id="tourism">
                <div className="container-fluid">
                    <div className="row">
                        <Swiper {...swiperOptions} className="banner-carousel theme_carousel owl-theme">

                            {/* Slide 1 */}
                            <SwiperSlide>
                                <div className="portfolio-style1__single">
                                    <div className="portfolio-style1__single-img">
                                        <div className="inner">
                                            <div className="media">
                                                <img src="/assets/images/resources/ura.jpg" alt="Ura e Vashës" />
                                            </div>
                                            <div className="text-box">
                                                <p>Histori</p>
                                                <h2><Link href="https://maps.app.goo.gl/f7Mvf2iT6vivrfF67">Ura e vashës</Link></h2>
                                            </div>
                                            <div className="portfolio-style1__link">
                                                <Link className="img-popup" href="/assets/images/resources/ura.jpg">
                                                    <span className="icon-plus"></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 2 */}
                            <SwiperSlide>
                                <div className="portfolio-style1__single">
                                    <div className="portfolio-style1__single-img">
                                        <div className="inner">
                                            <div className="media">
                                                <img src="/assets/images/resources/kulla.png" alt="Kulla shekullore" />
                                            </div>
                                            <div className="text-box">
                                                <p>Histori</p>
                                                <h2><Link href="https://maps.app.goo.gl/f7Mvf2iT6vivrfF67">Kulla shekullore</Link></h2>
                                            </div>
                                            <div className="portfolio-style1__link">
                                                <Link className="img-popup" href="/assets/images/resources/kulla.png">
                                                    <span className="icon-plus"></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 3 */}
                            <SwiperSlide>
                                <div className="portfolio-style1__single">
                                    <div className="portfolio-style1__single-img">
                                        <div className="inner">
                                            <div className="media">
                                                <img src="/assets/images/resources/xhabza.png" alt="Xhabza" />
                                            </div>
                                            <div className="text-box">
                                                <p>Natyrë</p>
                                                <h2><Link href="https://maps.app.goo.gl/f7Mvf2iT6vivrfF67">Xhabza</Link></h2>
                                            </div>
                                            <div className="portfolio-style1__link">
                                                <Link className="img-popup" href="/assets/images/resources/xhabza.png">
                                                    <span className="icon-plus"></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 4 */}
                            <SwiperSlide>
                                <div className="portfolio-style1__single">
                                    <div className="portfolio-style1__single-img">
                                        <div className="inner">
                                            <div className="media">
                                                <img src="/assets/images/resources/balgjaj.png" alt="Mali i Balgjajt" />
                                            </div>
                                            <div className="text-box">
                                                <p>Natyrë</p>
                                                <h2><Link href="https://www.google.com/maps/place/Mali+i+Balgjajt/@41.5791662,20.2083333,2481m/data=!3m2!1e3!4b1!4m6!3m5!1s0x1351a46b86ba2163:0x474bfe6f821c21fa!8m2!3d41.5791667!4d20.2083333!16s%2Fg%2F11bxb8pdxr!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D">Mali Balgjajt</Link></h2>
                                            </div>
                                            <div className="portfolio-style1__link">
                                                <Link className="img-popup" href="/assets/images/resources/balgjaj.png">
                                                    <span className="icon-plus"></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </section>
            {/*End Portfolio Style1 */}

            {/* CSS shtesë vetëm për imazhet */}
            <style jsx>{`
                .media {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1; /* ose zëvendëso me height fikse: height: 260px; */
                    overflow: hidden;
                }
                .media img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
            `}</style>
        </>
    )
}
