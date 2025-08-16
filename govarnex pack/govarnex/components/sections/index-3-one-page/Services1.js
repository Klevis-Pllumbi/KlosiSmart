
import Link from "next/link"

export default function Services1() {
    return (
        <>
            {/*Start Services Style1 */}
            <section className="services-style1 services-style1--style2 services-style1--style2--style3" id="services1">
                <div className="shape1"><img src="assets/images/shapes/services-v3-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>EFFICIENCY - OPPORTUNITY</h6>
                        </div>
                        <h2>City Municipality Services <br />And Departments</h2>
                    </div>
                    <div className="row">
                        {/*Start Services Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img src="assets/images/services/services-v2-img1.jpg" alt="#" />
                                </div>
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
                        <div className="col-xl-4 col-lg-4 wow fadeInRight" data-wow-delay="100ms" data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img src="assets/images/services/services-v2-img2.jpg" alt="#" />
                                </div>
                                <div className="services-style1__single-content text-center">
                                    <div className="services-style1__single-icon">
                                        <span className="icon-Group-6"></span>
                                    </div>
                                    <div className="services-style1__single-text">
                                        <h3><Link href="/departments-details"> Employment And <br /> Job Planning</Link></h3>
                                        <div className="btn-box">
                                            <Link href="/departments-details"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Services Style1 Single */}

                        {/*Start Services Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img src="assets/images/services/services-v2-img3.jpg" alt="#" />
                                </div>
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
                    </div>
                </div>
            </section>
            {/*End Services Style1 */}
        </>
    )
}
