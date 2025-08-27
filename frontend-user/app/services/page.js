
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Services">
                <div>
                {/*Start Services Page */}
                <section className="services-page">
                    <div className="shape1"><img src="assets/images/shapes/services-page-shape1.png" alt="#" /></div>
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>Services</h6>
                            </div>
                            <h2>Find Goverment Services <br /> and Information</h2>
                        </div>

                        <div className="row">
                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-2"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Trash & Recycling</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-12"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Fishing & Boating</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-13"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Taxis & Private</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-14"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details"> Building Sanction</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-15"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Birth Cirtificate</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-16"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Tax & Finance</Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-17"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Park & Recreation
                                            </Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}

                            {/*Start Services Page Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6">
                                <div className="services-page__single">
                                    <div className="services-page__single-icon">
                                        <span className="icon-Group-11"></span>
                                    </div>
                                    <div className="services-page__single-inner">
                                        <h3><Link href="/departments-details">Sidewalks, Parking
                                            </Link></h3>
                                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed tellus auctor.</p>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Services Page Single */}
                        </div>
                    </div>
                </section>
                {/*End Services Page */}


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