import Link from "next/link"


export default function Events() {
    return (
        <>
            {/*Start Events-style2 */}
            <section className="events-style2">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>upcoming Events</h6>
                        </div>
                        <h2>Explore Upcoming City <br />Event Schedule</h2>
                    </div>
                    <div className="row">
                        {/*Start Events Style2 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.1s">
                            <div className="events-style2__single">
                                <div className="events-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/events-v2-img1.jpg" alt="#" />
                                    </div>
                                    <div className="date-box">
                                        <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                    </div>
                                </div>

                                <div className="events-style2__single-content text-center">
                                    <h2><Link href="/event-details">The Youth Event Things <br /> To Remember</Link></h2>
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
                                    <div className="events-style2__single-btn">
                                        <Link className="btn-one" href="/event-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Events Style2 Single */}

                        {/*Start Events Style2 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.3s">
                            <div className="events-style2__single">
                                <div className="events-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/events-v2-img2.jpg" alt="#" />
                                    </div>
                                    <div className="date-box">
                                        <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                    </div>
                                </div>

                                <div className="events-style2__single-content text-center">
                                    <h2><Link href="/event-details">Process of Civil Litigation <br /> Paper’s Conference</Link>
                                    </h2>
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
                                    <div className="events-style2__single-btn">
                                        <Link className="btn-one" href="/event-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Events Style2 Single*/}

                        {/*Start Events Style2 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.5s">
                            <div className="events-style2__single">
                                <div className="events-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/events-v2-img3.jpg" alt="#" />
                                    </div>
                                    <div className="date-box">
                                        <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                    </div>
                                </div>

                                <div className="events-style2__single-content text-center">
                                    <h2><Link href="/event-details">Protest of Violence Against <br /> Women Rights</Link></h2>
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
                                    <div className="events-style2__single-btn">
                                        <Link className="btn-one" href="/event-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Events Style2 Single */}
                    </div>
                </div>
            </section>
            {/*End Events-style2 */}
        </>
    )
}
