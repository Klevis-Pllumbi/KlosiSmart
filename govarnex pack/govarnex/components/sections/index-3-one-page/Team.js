import Link from "next/link"


export default function Team() {
    return (
        <>
            {/*Start Team Style2 */}
            <section className="team-style2 team-style2--style3" id="team">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>Council Members</h6>
                        </div>
                        <h2>Meet Excellent Council <br /> Members</h2>
                    </div>
                    <div className="row">
                        {/* Start Team Style2 Single*/}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div className="team-style2__single">
                                <div className="team-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/team/team-v3-img1.jpg" alt="#" />
                                        <div className="team-style2__single-content text-center">
                                            <h2><Link href="/team-details">Robert Gates</Link></h2>
                                            <p>Director</p>
                                            <ul className="social-links clearfix">
                                                <li><Link href="mailto:yourmail@email.com"><span
                                                            className="icon-mail-1"></span></Link></li>
                                                <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                    <ul className="social-links-inner">
                                                        <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                        </li>
                                                        <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                        <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Team Style2 Single */}

                        {/*Start Team Style2 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                            <div className="team-style2__single">
                                <div className="team-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/team/team-v3-img2.jpg" alt="#" />
                                        <div className="team-style2__single-content text-center">
                                            <h2><Link href="/team-details">Nicholas Cage</Link></h2>
                                            <p>Director</p>
                                            <ul className="social-links clearfix">
                                                <li><Link href="mailto:yourmail@email.com"><span
                                                            className="icon-mail-1"></span></Link></li>
                                                <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                    <ul className="social-links-inner">
                                                        <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                        </li>
                                                        <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                        <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Team Style2 Single */}

                        {/*Start Team Style2 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <div className="team-style2__single">
                                <div className="team-style2__single-img">
                                    <div className="inner">
                                        <img src="assets/images/team/team-v3-img3.jpg" alt="#" />
                                        <div className="team-style2__single-content text-center">
                                            <h2><Link href="/team-details">Keanu Reeves</Link></h2>
                                            <p>Mayor Assistant</p>
                                            <ul className="social-links clearfix">
                                                <li><Link href="mailto:yourmail@email.com"><span
                                                            className="icon-mail-1"></span></Link></li>
                                                <li className="share"><Link href="#"><span className="icon-share"></span></Link>
                                                    <ul className="social-links-inner">
                                                        <li><Link href="#"><i className="icon-twitter"></i></Link>
                                                        </li>
                                                        <li><Link href="#"><i className="icon-facebook-app-symbol"></i></Link></li>
                                                        <li><Link href="#"><i className="icon-instagram"></i></Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="tel:1234567890"><span className="icon-telephone"></span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Team Style2 Single */}
                    </div>
                </div>
            </section>
            {/*End Team Style2 */}
        </>
    )
}
