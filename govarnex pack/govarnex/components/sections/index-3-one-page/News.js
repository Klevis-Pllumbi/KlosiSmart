import Link from "next/link"


export default function News() {
    return (
        <>
            {/*Start Blog Style1 */}
            <section className="blog-style1 blog-style1--style3" id="news">
                <div className="shape1"><img src="assets/images/shapes/blog-v1-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="blog-style1--style3__top">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>City News</h6>
                                    </div>
                                    <h2>Know More About The City by <br /> Govarnex Media</h2>
                                </div>

                                <div className="blog-style1--style3__top-btn">
                                    <Link className="btn-one" href="/blog-grid">
                                        <span className="txt">More News</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/*Start Blog Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                            <div className="blog-style1__single">
                                <div className="blog-style1__single-img">
                                    <img src="assets/images/blog/blog-v1-1.jpg" alt="#" />
                                </div>

                                <div className="blog-style1__single-content">
                                    <div className="date-box">
                                        <p> <span className="icon-calendar"></span> Apr 17, 2023</p>
                                    </div>
                                    <h2><Link href="/blog-details">Self-Guided Driving & Tours Walk Of Greater City</Link>
                                    </h2>
                                    <ul className="meta-box">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-user"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">Admin</Link></p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-comment"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">0 Comment</Link></p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="text">
                                        <p>In ornare pellentesque sed elementum sed ac adipiscing suscipit auctor molestie
                                            eget sociis</p>
                                    </div>
                                    <div className="blog-style1__single-conten-btn">
                                        <Link className="btn-one" href="/blog-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Blog Style1 Single */}

                        {/*Start Blog Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInDown" data-wow-delay=".3s">
                            <div className="blog-style1__single">
                                <div className="blog-style1__single-img">
                                    <img src="assets/images/blog/blog-v1-2.jpg" alt="#" />
                                </div>

                                <div className="blog-style1__single-content">
                                    <div className="date-box">
                                        <p> <span className="icon-calendar"></span> Apr 17, 2023</p>
                                    </div>
                                    <h2><Link href="/blog-details">Assistance For Homes And Properties Real Estate</Link></h2>
                                    <ul className="meta-box">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-user"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">Admin</Link></p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-comment"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">0 Comment</Link></p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="text">
                                        <p>In ornare pellentesque sed elementum sed ac adipiscing suscipit auctor molestie
                                            eget sociis</p>
                                    </div>
                                    <div className="blog-style1__single-conten-btn">
                                        <Link className="btn-one" href="/blog-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Blog Style1 Single */}

                        {/*Start Blog Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                            <div className="blog-style1__single">
                                <div className="blog-style1__single-img">
                                    <img src="assets/images/blog/blog-v1-3.jpg" alt="#" />
                                </div>

                                <div className="blog-style1__single-content">
                                    <div className="date-box">
                                        <p> <span className="icon-calendar"></span> Apr 17, 2023</p>
                                    </div>
                                    <h2><Link href="/blog-details">Long-Term Vision Of Health & Attractive Facility</Link>
                                    </h2>
                                    <ul className="meta-box">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-user"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">Admin</Link></p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-comment"></span>
                                            </div>
                                            <div className="text">
                                                <p><Link href="#">0 Comment</Link></p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="text">
                                        <p>In ornare pellentesque sed elementum sed ac adipiscing suscipit auctor molestie
                                            eget sociis</p>
                                    </div>
                                    <div className="blog-style1__single-conten-btn">
                                        <Link className="btn-one" href="/blog-details">
                                            <span className="txt">Read More</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Blog Style1 Single */}
                    </div>
                </div>
            </section>
            {/*End Blog Style1 */}
        </>
    )
}
