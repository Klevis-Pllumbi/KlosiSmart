'use client'
import Link from "next/link"
import { useState } from "react"


export default function Events() {
    
    return (
        <>
            {/* Start Events Style1*/}
            <section className="events-style1">
                <div className="events-style1__bg" style={{ backgroundImage: 'url(assets/images/backgrounds/events-v1-bg.png)'}}>
                </div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>upcoming Events</h6>
                        </div>
                        <h2>Explore Upcoming City <br />Event Schedule</h2>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="events-style1__inner">
                                {/*Start Events Style1 Single */}
                                <div className="events-style1__single wow animated fadeInUp" data-wow-delay="0.1s">
                                    <div className="events-style1__single-left">
                                        <div className="img-box">
                                            <img src="assets/images/resources/events-v1-img1.jpg" alt="#" />
                                        </div>
                                        <div className="title">
                                            <h2><Link href="/event-details">The Youth Event – Things <br /> To Remember</Link>
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="events-style1__single__right">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-wall-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>08.00AM - 06.00PM</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>New Hyde Park, NY 11040</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="events-style1__single__right-btn">
                                            <Link className="btn-one" href="/event-details">
                                                <span className="txt">Read More</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/*End Events Style1 Single */}

                                {/* Start Events Style1 Single*/}
                                <div className="events-style1__single wow animated fadeInUp" data-wow-delay="0.2s">
                                    <div className="events-style1__single-left">
                                        <div className="img-box">
                                            <img src="assets/images/resources/events-v1-img2.jpg" alt="#" />
                                        </div>
                                        <div className="title">
                                            <h2><Link href="/event-details">Street San Antonio <br /> Sketches & Urban
                                                    History</Link></h2>
                                        </div>
                                    </div>

                                    <div className="events-style1__single__right">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-wall-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>08.00AM - 06.00PM</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>New Hyde Park, NY 11040</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="events-style1__single__right-btn">
                                            <Link className="btn-one" href="/event-details">
                                                <span className="txt">Read More</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/*End Events Style1 Single */}

                                {/* Start Events Style1 Single*/}
                                <div className="events-style1__single wow animated fadeInUp" data-wow-delay="0.3s">
                                    <div className="events-style1__single-left">
                                        <div className="img-box">
                                            <img src="assets/images/resources/events-v1-img3.jpg" alt="#" />
                                        </div>
                                        <div className="title">
                                            <h2><Link href="/event-details">Protest of Violence <br /> Against Women
                                                    Rights</Link></h2>
                                        </div>
                                    </div>

                                    <div className="events-style1__single__right">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-wall-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>08.00AM - 06.00PM</p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>New Hyde Park, NY 11040</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="events-style1__single__right-btn">
                                            <Link className="btn-one" href="/event-details">
                                                <span className="txt">Read More</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/*End Events Style1 Single */}
                                <div className="events-style1__btn text-center">
                                    <Link className="btn-one" href="/event-details">
                                        <span className="txt">More Events</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Events Style1*/}
        </>
    )
}
