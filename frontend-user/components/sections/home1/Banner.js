
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
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



}

export default function Banner() {
    return (
        <>
            <section className="main-slider main-slider-one" id="home">
                <Swiper {...swiperOptions} className="banner-carousel theme_carousel owl-theme">
                    <SwiperSlide className="slide-item">
                    <div className="image-layer" style={{backgroundImage: 'url(assets/images/slides/slide-v1-1.jpg)'}}></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-one__content">
                                        <div className="title">
                                            <h2>Best of City’s <br /> Arts & <span>Culture</span> <br/>Online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br/> Turpis
                                                ridiculus
                                                tellus.</p>
                                        </div>
                                        <div className="btn-box">
                                            <Link className="btn-one" href="#">
                                                <span className="txt">Volunteer Tour</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-item">
                        <div className="image-layer" style={{backgroundImage: 'url(assets/images/slides/slide-v1-2.jpg)'}}>
                        </div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-one__content">
                                        <div className="title">
                                            <h2>Best of City’s <br /> Arts & <span>Culture</span> <br />Online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br /> Turpis
                                                ridiculus
                                                tellus.</p>
                                        </div>
                                        <div className="btn-box">
                                            <Link className="btn-one" href="#">
                                                <span className="txt">Volunteer Tour</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

            </section>
        </>
    )
}
