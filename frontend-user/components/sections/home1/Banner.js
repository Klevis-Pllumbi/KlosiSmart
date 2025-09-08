
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    // autoplay: {
    //     delay: 7500,
    //     disableOnInteraction: true,
    // },
    // loop: true,

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
                    <div className="image-layer" style={{backgroundImage: 'url(assets/images/slides/img.png)'}}></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-one__content">
                                        <div className="title">
                                            <h2>Më të mirat e qytetit <br /> artit & <span>kulturës</span> <br/>online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Një hap drejt një komuniteti më të lidhur, <br/>
                                                ku informacioni dhe bashkëpunimi janë gjithmonë në dorën tuaj.</p>
                                        </div>
                                        {/*<div className="btn-box">*/}
                                        {/*    <Link className="btn-one" href="#">*/}
                                        {/*        <span className="txt">Kontakto</span>*/}
                                        {/*    </Link>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="slide-item">
                        <div className="image-layer" style={{backgroundImage: 'url(assets/images/slides/kreu.png)'}}>
                        </div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider-one__content">
                                        <div className="title">
                                            <h2>Ura e <span>Vashës</span><br />
                                            Traditë, Histori, <br/>
                                            Legjendë</h2>
                                        </div>
                                        <div className="text">
                                            <p>Aset kulturor dhe historik, <br />
                                            Pasuri Kombëtare</p>
                                        </div>
                                        {/*<div className="btn-box">*/}
                                        {/*    <Link className="btn-one" href="#">*/}
                                        {/*        <span className="txt">Volunteer Tour</span>*/}
                                        {/*    </Link>*/}
                                        {/*</div>*/}
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
