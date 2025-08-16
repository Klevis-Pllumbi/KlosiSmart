'use client'
import CounterUp from "@/components/elements/CounterUp"
import Layout from "@/components/layout/Layout"
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03"
import Link from "next/link"
import { useState } from 'react'
import ReactCurvedText from 'react-curved-text'
import ModalVideo from 'react-modal-video'
export default function Home() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="About Us">
                <div>
                {/*Start About Style2 */}
                <section className="about-style2 about-style2--about">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="about-style2__img">
                                    <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                                    <div className="shape2 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                    </div>
                                    <div className="about-style2__img-video-box text-center">
                                        
                                        <a onClick={() => setOpen(true)} className="video-popup">
                                            <div className="about-style2__img-video-box-icon">
                                                <span className="icon-play-1"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </a>
                                        <div className="title">
                                            <h3>Watch Leader <br /> Talk</h3>
                                        </div>
                                    </div>
                                    <div className="inner">
                                        <img src="assets/images/about/about-page-about-img1.jpg" alt="#" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-xl-6">
                                <div className="about-style2__content">
                                    <div className="sec-title">
                                        <div className="sub-title">
                                            <h6>About Govarnex</h6>
                                        </div>
                                        <h2>Welcome & Support <br /> To Govarnex City Municipal</h2>
                                    </div>
                                    <div className="about-style2__content-text">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                    </div>

                                    <div className="about-style2__content-bottom">
                                        <div className="inner">
                                            <ul>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p>Improving all types of opportunities</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p>Quick solutions for daily problems</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-check"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p>Community that grows larger</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <ul className="about-style2--about__social-links">
                                            <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                                            <li><Link href="#"><span className="icon-twitter"></span></Link></li>
                                            <li><Link href="#"><span className="icon-instagram"></span></Link></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End About Style2 */}

                {/*Start Services Style1 */}
                <section className="services-style1">
                    <div className="shape1"></div>
                    <div className="shape2 rotate-me"><img src="assets/images/shapes/services-v1-shape1.png" alt="#" /></div>
                    <div className="shape3 float-bob-y"><img src="assets/images/shapes/services-v1-shape2.png" alt="#" /></div>
                    <div className="shape4"><img src="assets/images/shapes/services-v1-shape3.png" alt="#" /></div>
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>EFFICIENCY - OPPORTUNITY</h6>
                            </div>
                            <h2>City Municipality Services <br />And Departments</h2>
                        </div>
                        <div className="row">
                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-5"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details"> Government And <br /> Elections</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInLeft" data-wow-delay="100ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-6"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details">Employment And <br /> Job Planning</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="0ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-7"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details"> Real Estate And <br /> Buildings</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="100ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-16"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details"> Business Tax And <br /> Finance</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInLeft" data-wow-delay="0ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-121"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details">Health & Medical <br /> Department</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInLeft" data-wow-delay="100ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-9"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details">Finance & Legal <br /> Department</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="0ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-10"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details">Park & Recreation <br /> Department</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}

                            {/*Start Services Style1 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="100ms"
                                data-wow-duration="1000ms">
                                <div className="services-style1__single">
                                    <div className="services-style1__single-content text-center">
                                        <div className="services-style1__single-icon">
                                            <span className="icon-Group-11"></span>
                                        </div>
                                        <div className="services-style1__single-text">
                                            <h3><Link href="/departments-details"> Sidewalks, Parking <br /> Highways</Link></h3>
                                            <div className="btn-box">
                                                <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Style1 Single */}
                        </div>
                    </div>
                </section>
                {/*End Services Style1 */}


                {/*Start Fact Counter Style3 */}
                <section className="fact-counter-style3">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Fact Counter Style3 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.1s"
                                data-wow-duration="1500ms">
                                <div className="fact-counter-style3__single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={4.2} /><span>M</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Total People Lived <br /> in Our City</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Fact Counter Style3 Single */}

                            {/*Start Fact Counter Style3 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.3s"
                                data-wow-duration="1500ms">
                                <div className="fact-counter-style3__single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={7} /><span>Km2</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Square Kilometres <br /> Region Covers</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Fact Counter Style3 Single */}

                            {/*Start Fact Counter Style3 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.5s"
                                data-wow-duration="1500ms">
                                <div className="fact-counter-style3__single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={3} /><span>rd</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Largesty City in our <br /> Country</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Fact Counter Style3 Single */}

                            {/*Start Fact Counter Style3 Single */}
                            <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.7s"
                                data-wow-duration="1500ms">
                                <div className="fact-counter-style3__single text-center">
                                    <div className="counter-box">
                                    <h2><CounterUp end={20} /><span>%</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Private & domestic <br /> garden land</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Fact Counter Style3 Single */}
                        </div>
                    </div>
                </section>
                {/*End Fact Counter Style3 */}

                {/*Start Government Voice */} 
                <section className="government-voice clearfix">
                    <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Government Voice Content */}
                            <div className="col-xl-6 col-lg-6">
                                <div className="government-voice__content">
                                    <div className="sec-title">
                                        <div className="sub-title">
                                            <h6>Mayor of govarnex</h6>
                                        </div>
                                        <h2>Major Voice of City <br /> Government</h2>
                                    </div>
                                    <div className="government-voice__content-inner">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                        <ul>
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-check-mark"></span>
                                                </div>
                                                <div className="text">
                                                    <p>Develop the Municipaity</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-check-mark"></span>
                                                </div>
                                                <div className="text">
                                                    <p>Maintain Financial Integrity</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-check-mark"></span>
                                                </div>
                                                <div className="text">
                                                    <p>Represent the Public</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*End Government Voice Content */}

                            {/*Start Government Voice Img */}
                            <div className="col-xl-6 col-lg-6">
                                <div className="government-voice__img">
                                    <div className="shape2 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                    </div>
                                    <div className="inner wow slideInRight" data-wow-delay="500ms" data-wow-duration="2500ms">
                                        <img src="assets/images/resources/government-voice-img1.png" alt="#" />
                                    </div>
                                </div>
                            </div>
                            {/*End Government Voice Img */}
                        </div>
                    </div>

                    {/*Start Government Voice Bottom */}
                    <div className="government-voice__bottom">
                        <div className="auto-container">
                            <div className="row">
                                {/*Start Government Voice Bottom Content */}
                                <div className="col-xl-7 col-lg-9">
                                    <div className="government-voice__bottom-content">
                                        <TestimonialSlider03/>
                                    </div>
                                </div>
                                {/*End Government Voice Bottom Content */}
                            </div>
                        </div>
                    </div>
                    {/*End Government Voice Bottom */}
                </section>
                {/*End Government Voice */} 

                {/*Start Team Style1 */}
                <section className="team-style1">
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>Council Members</h6>
                            </div>
                            <h2>Meet Excellent Council <br /> Members</h2>
                        </div>
                        <div className="row">
                            {/*Start Team Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".1s">
                                <div className="team-style1__single">
                                    <div className="team-style1__single-img">
                                        <div className="team-style1__single-img-inner">
                                            <img src="assets/images/team/team-v1-img1.jpg" alt="#" />
                                        </div>

                                        <ul className="social-links clearfix">
                                            <li><Link href="mailto:yourmail@email.com"><span className="icon-mail-1"></span></Link>
                                            </li>
                                            <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                <ul className="social-links-inner">
                                                    <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                    </li>
                                                    <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                        </ul>
                                    </div>

                                    <div className="team-stye1__single-content text-center">
                                        <div className="inner-box">
                                            <div className="round-bg"></div>
                                            <h2><Link href="/team-details">Robert Gates</Link></h2>
                                            <p>Ambassador</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Team Style1 Single */}

                            {/*Start Team Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                                <div className="team-style1__single">
                                    <div className="team-style1__single-img">
                                        <div className="team-style1__single-img-inner">
                                            <img src="assets/images/team/team-v1-img2.jpg" alt="#" />
                                        </div>

                                        <ul className="social-links clearfix">
                                            <li><Link href="mailto:yourmail@email.com"><span className="icon-mail-1"></span></Link>
                                            </li>
                                            <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                <ul className="social-links-inner">
                                                    <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                    </li>
                                                    <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                        </ul>
                                    </div>

                                    <div className="team-stye1__single-content text-center">
                                        <div className="inner-box">
                                            <div className="round-bg"></div>
                                            <h2><Link href="/team-details">Nicholas Cage</Link></h2>
                                            <p>Director</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Team Style1 Single */}

                            {/*Start Team Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                <div className="team-style1__single">
                                    <div className="team-style1__single-img">
                                        <div className="team-style1__single-img-inner">
                                            <img src="assets/images/team/team-v1-img3.jpg" alt="#" />
                                        </div>

                                        <ul className="social-links clearfix">
                                            <li><Link href="mailto:yourmail@email.com"><span className="icon-mail-1"></span></Link>
                                            </li>
                                            <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                <ul className="social-links-inner">
                                                    <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                    </li>
                                                    <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                        </ul>
                                    </div>

                                    <div className="team-stye1__single-content text-center">
                                        <div className="inner-box">
                                            <div className="round-bg"></div>
                                            <h2><Link href="/team-details">Keanu Reeves</Link></h2>
                                            <p>Mayor Assistant</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Team Style1 Single */}

                            {/*Start Team Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                                <div className="team-style1__single">
                                    <div className="team-style1__single-img">
                                        <div className="team-style1__single-img-inner">
                                            <img src="assets/images/team/team-v1-img4.jpg" alt="#" />
                                        </div>

                                        <ul className="social-links clearfix">
                                            <li><Link href="mailto:yourmail@email.com"><span className="icon-mail-1"></span></Link>
                                            </li>
                                            <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                <ul className="social-links-inner">
                                                    <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                    </li>
                                                    <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                </ul>
                                            </li>
                                            <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                        </ul>
                                    </div>

                                    <div className="team-stye1__single-content text-center">
                                        <div className="inner-box">
                                            <div className="round-bg"></div>
                                            <h2><Link href="/team-details">Brendan Fraser</Link></h2>
                                            <p>Council Member</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Team Style1 Single */}
                        </div>
                    </div>
                </section>
                {/*End Team Style1 */}

                {/*Start Cta Style1 */}
                <section className="cta-style1 cta-style1--style2">
                    <div className="cta-style1__bg" style={{backgroundImage: 'url(assets/images/backgrounds/cta-v1-bg.png)'}}></div>
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="cta-style1__inner">
                                    <div className="cta-style1__title">
                                        <div className="sec-title">
                                            <div className="sub-title">
                                                <h6>Become Volunteer</h6>
                                            </div>
                                            <h2>Become a Volunteer, Service to Our <br /> City, & Make Difference!</h2>
                                        </div>
                                    </div>

                                    <div className="cta-style1__btn">
                                        <Link className="btn-one" href="#">
                                            <span className="txt">Become Volunteer</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End Cta Style1 */}

                </div>
                <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="vfhzo499OeA" onClose={() => setOpen(false)} />
            </Layout>
        </>
    )
}


