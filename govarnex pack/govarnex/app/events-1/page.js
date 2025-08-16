
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Events 1">
                <div>
                {/*Start Events Style1 */}
                <section className="events-style1 events-style1--events1">
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

                                    {/*Start Events Style1 Single */}
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

                                    {/*Start Events Style1 Single */}
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

                                    {/*Start Events Style1 Single */}
                                    <div className="events-style1__single wow animated fadeInUp" data-wow-delay="0.4s">
                                        <div className="events-style1__single-left">
                                            <div className="img-box">
                                                <img src="assets/images/resources/events-v1-img4.jpg" alt="#" />
                                            </div>
                                            <div className="title">
                                                <h2><Link href="/event-details">Public Affairs & Public <br /> Safety Meeting</Link>
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

                                    {/*Start Events Style1 Single */}
                                    <div className="events-style1__single wow animated fadeInUp" data-wow-delay="0.5s">
                                        <div className="events-style1__single-left">
                                            <div className="img-box">
                                                <img src="assets/images/resources/events-v1-img5.jpg" alt="#" />
                                            </div>
                                            <div className="title">
                                                <h2><Link href="/event-details">Faith Forward - Social <br /> Awareness
                                                        Seminar</Link></h2>
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
                            </div>
                        </div>
                    </div>
                </section>
                {/*End Events Style1 */}


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
                                    <form action="/" className="comment-one__form contact-form-validated">
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