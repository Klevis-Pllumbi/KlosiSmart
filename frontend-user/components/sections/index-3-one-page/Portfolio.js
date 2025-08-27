import Link from "next/link"


export default function Portfolio() {
    return (
        <>
            {/*Start Portfolio Style1 */}
            <section className="portfolio-style1">
                <div className="container-fluid">
                    <div className="row">
                        {/*Start Portfolio Style1 Single */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img1.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Metro Train</p>
                                            <h2><Link href="#">City Metro Train</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img1.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Portfolio Style1 Single*/}

                        {/*Start Portfolio Style1 Single */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img2.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Tourist Guide</p>
                                            <h2><Link href="#">Main Tourist Spots</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img2.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Portfolio Style1 Single */}

                        {/*Start Portfolio Style1 Single */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img3.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Golf day</p>
                                            <h2><Link href="#">Mayor Golf Day</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img3.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Portfolio Style1 Single */}

                        {/*Start Portfolio Style1 Single */}
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="portfolio-style1__single">
                                <div className="portfolio-style1__single-img">
                                    <div className="inner">
                                        <img src="assets/images/resources/portfolio-v1-img4.jpg" alt="#" />
                                        <div className="text-box">
                                            <p>Visit Museum</p>
                                            <h2><Link href="#">City Great Museum</Link></h2>
                                        </div>
                                        <div className="portfolio-style1__link">
                                            <Link className="img-popup" href="assets/images/resources/portfolio-v1-img4.jpg"><span
                                                    className="icon-plus"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Portfolio Style1 Single */}
                    </div>
                </div>
            </section>
            {/*End Portfolio Style1 */}
        </>
    )
}
