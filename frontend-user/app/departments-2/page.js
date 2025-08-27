
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Departments 2">
                <div>
                {/*Start Services Style1 */}
                <section className="services-style1 services-style1--departments2">
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