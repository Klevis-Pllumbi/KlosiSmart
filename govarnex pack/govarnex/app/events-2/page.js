
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Events 2">
                <div>
                {/*Start Events-style2 */}
                <section className="events-style2 events-style2--events2">
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
                            {/*End Events Style2 Single */}

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

                            {/*Start Events Style2 Single */}
                            <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.1s">
                                <div className="events-style2__single">
                                    <div className="events-style2__single-img">
                                        <div className="inner">
                                            <img src="assets/images/resources/events-v2-img4.jpg" alt="#" />
                                        </div>
                                        <div className="date-box">
                                            <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                        </div>
                                    </div>

                                    <div className="events-style2__single-content text-center">
                                        <h2><Link href="/event-details">Public Affairs & Public <br /> Safety Meeting</Link></h2>
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
                                            <img src="assets/images/resources/events-v2-img5.jpg" alt="#" />
                                        </div>
                                        <div className="date-box">
                                            <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                        </div>
                                    </div>

                                    <div className="events-style2__single-content text-center">
                                        <h2><Link href="/event-details">Faith Forward - Social <br /> Awareness Seminar</Link></h2>
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
                            <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.5s">
                                <div className="events-style2__single">
                                    <div className="events-style2__single-img">
                                        <div className="inner">
                                            <img src="assets/images/resources/events-v2-img6.jpg" alt="#" />
                                        </div>
                                        <div className="date-box">
                                            <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                        </div>
                                    </div>

                                    <div className="events-style2__single-content text-center">
                                        <h2><Link href="/event-details">Cultural Festival & Concert <br /> at Domanion Valer</Link>
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
                            {/*End Events Style2 Single */}

                            {/*Start Events Style2 Single */}
                            <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.1s">
                                <div className="events-style2__single">
                                    <div className="events-style2__single-img">
                                        <div className="inner">
                                            <img src="assets/images/resources/events-v2-img7.jpg" alt="#" />
                                        </div>
                                        <div className="date-box">
                                            <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                        </div>
                                    </div>

                                    <div className="events-style2__single-content text-center">
                                        <h2><Link href="/event-details">Sports Basement Group <br /> Monthly Ride</Link></h2>
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
                                            <img src="assets/images/resources/events-v2-img8.jpg" alt="#" />
                                        </div>
                                        <div className="date-box">
                                            <p><span className="icon-calendar-1"></span>Apr 17, 2023</p>
                                        </div>
                                    </div>

                                    <div className="events-style2__single-content text-center">
                                        <h2><Link href="/event-details">The Strategically Build <br /> Your Business</Link></h2>
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
                            <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.5s">
                                <div className="events-style2__single">
                                    <div className="events-style2__single-img">
                                        <div className="inner">
                                            <img src="assets/images/resources/events-v2-img9.jpg" alt="#" />
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

                        <div className="row">
                            <div className="col-xl-12">
                                <ul className="styled-pagination text-center clearfix">
                                    <li className="arrow prev"><Link href="#"><span className="icon-left-arrow-1"></span></Link>
                                    </li>
                                    <li className="active"><Link href="#">1</Link></li>
                                    <li><Link href="#">2</Link></li>
                                    <li><Link href="#">3</Link></li>
                                    <li className="arrow next"><Link href="#"><span className="icon-next"></span></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>
                {/*End Events-style2 */}


                {/*Start Newsletter Style1 */}
                <section className="newsletter-style1">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Newsletter Style1 Title */}
                            <div className="col-xl-4">
                                <div className="newsletter-style1__title">
                                    <h2>Subscribe To Our <br /> Newsletter</h2>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Title */}

                            {/*Start Newsletter Style1 Form */}
                            <div className="col-xl-8">
                                <div className="newsletter-style1__form">
                                    <form action="" className="comment-one__form contact-form-validated" >
                                        <div className="newsletter-style1__form-inner">
                                            <ul>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input type="text" placeholder="Your name" name="name" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input type="email" placeholder="Your email" name="email" />
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="newsletter-style1__form-btn">
                                                <button type="submit" className="btn-one newsletter-style1__form-btn">
                                                    <span className="txt">Subscribe Now</span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Form */}
                        </div>
                    </div>
                </section>
                {/*End Newsletter Style1 */}
                </div>

            </Layout>
        </>
    )
}