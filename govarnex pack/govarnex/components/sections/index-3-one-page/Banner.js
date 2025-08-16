
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
            <section className="main-slider main-slider-three" id="home">
                <Swiper {...swiperOptions} className="banner-carousel theme_carousel owl-theme">
                    {/* Slide Item */}
                    <SwiperSlide className="slide-item">
                    {/*Start Single Swiper Slide */}
                        <div className="shape1"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape1.png"
                                alt="#" /></div>
                        <div className="shape2" style={{backgroundImage: 'url(assets/images/shapes/slider-v3-shape2.png)'}}>
                        </div>
                        <div className="shape3" style={{ backgroundImage: 'url(assets/images/shapes/slider-v3-shape3.png)'}}>
                        </div>
                        <div className="shape5"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape5.png"
                                alt="#" /></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7 col-md-7">
                                    <div className="main-slider-three__content">
                                        <div className="sub-title">
                                            <span>Welcome to the</span>
                                        </div>
                                        <div className="title">
                                            <h2>Best of City’s Arts & <br /> Culture Online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br /> Turpis
                                                ridiculus
                                                tellus.i </p>
                                        </div>
                                        <div className="btn-box">
                                            <a className="btn-one" href="#">
                                                <span className="txt">Volunteer Tour</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-5 col-lg-5 col-md-5">
                                    <div className="main-slider-three__img clearfix">
                                        <div className="inner">
                                            <div className="shape6"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape6.png" alt="#" /></div>
                                            <div className="shape7"><img className="rotate-me"
                                                    src="assets/images/shapes/slider-v3-shape7.png" alt="#" /></div>
                                            <div className="shape8"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape8.png" alt="#" /></div>
                                            <div className="img-box">
                                                <img src="assets/images/slides/slide-v3-1.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    {/*End Single Swiper Slide */}
                    </SwiperSlide>
                    {/* Slide Item */}
                    <SwiperSlide className="slide-item">
                    {/*Start Single Swiper Slide */}
                        <div className="shape1"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape1.png"
                                alt="#" /></div>
                        <div className="shape2" style={{backgroundImage: 'url(assets/images/shapes/slider-v3-shape2.png)'}}></div>
                        <div className="shape3" style={{backgroundImage: 'url(assets/images/shapes/slider-v3-shape3.png)'}}></div>
                        <div className="shape5"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape5.png"
                                alt="#" /></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7 col-md-7">
                                    <div className="main-slider-three__content">
                                        <div className="sub-title">
                                            <span>Welcome to the</span>
                                        </div>
                                        <div className="title">
                                            <h2>Best of City’s Arts & <br /> Culture Online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br /> Turpis
                                                ridiculus
                                                tellus.i </p>
                                        </div>
                                        <div className="btn-box">
                                            <a className="btn-one" href="#">
                                                <span className="txt">Volunteer Tour</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-5 col-lg-5 col-md-5">
                                    <div className="main-slider-three__img clearfix">
                                        <div className="inner">
                                            <div className="shape6"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape6.png" alt="#" /></div>
                                            <div className="shape7"><img className="rotate-me"
                                                    src="assets/images/shapes/slider-v3-shape7.png" alt="#" /></div>
                                            <div className="shape8"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape8.png" alt="#" /></div>
                                            <div className="img-box">
                                                <img src="assets/images/slides/slide-v3-1.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* End Single Swiper Slide*/}
                    </SwiperSlide>
                    {/* Slide Item */}
                    <SwiperSlide className="slide-item">
                    {/*Start Single Swiper Slide */}
                        <div className="shape1"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape1.png"
                                alt="#" /></div>
                        <div className="shape2" style={{backgroundImage: 'url(assets/images/shapes/slider-v3-shape2.png)'}}></div>
                        <div className="shape3" style={{backgroundImage: 'url(assets/images/shapes/slider-v3-shape3.png)'}}></div>
                        <div className="shape5"><img className="float-bob-y" src="assets/images/shapes/slider-v3-shape5.png"
                                alt="#" /></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7 col-md-7">
                                    <div className="main-slider-three__content">
                                        <div className="sub-title">
                                            <span>Welcome to the</span>
                                        </div>
                                        <div className="title">
                                            <h2>Best of City’s Arts & <br /> Culture Online</h2>
                                        </div>
                                        <div className="text">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit <br /> Turpis
                                                ridiculus
                                                tellus.i </p>
                                        </div>
                                        <div className="btn-box">
                                            <a className="btn-one" href="#">
                                                <span className="txt">Volunteer Tour</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-5 col-lg-5 col-md-5">
                                    <div className="main-slider-three__img clearfix">
                                        <div className="inner">
                                            <div className="shape6"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape6.png" alt="#" /></div>
                                            <div className="shape7"><img className="rotate-me"
                                                    src="assets/images/shapes/slider-v3-shape7.png" alt="#" /></div>
                                            <div className="shape8"><img className="float-bob-y"
                                                    src="assets/images/shapes/slider-v3-shape8.png" alt="#" /></div>
                                            <div className="img-box">
                                                <img src="assets/images/slides/slide-v3-1.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/*End Single Swiper Slide */}
                    </SwiperSlide>
                </Swiper>
            </section>
        </>
    )
}
