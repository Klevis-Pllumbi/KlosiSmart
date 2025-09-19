
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Histori">
                <div>
                {/*Start History Timeline */}
                <section className="history-timeline">
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>History</h6>
                            </div>
                            <h2>See History Timeline</h2>
                        </div>

                        <div className="history-timeline__inner">
                            <div className="top-round"></div>
                            <div className="top-bottom"></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6">
                                    <div className="history-timeline__img">
                                        <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                        </div>
                                        <div className="inner">
                                            <img src="assets/images/resources/history-img1.jpg" alt="#" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6">
                                    <div className="history-timeline__content">
                                        <div className="line"></div>
                                        <h3>1965</h3>
                                        <h2><Link href="#">City Council <br /> Founded</Link></h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 order-22">
                                    <div className="history-timeline__content style2">
                                        <div className="line"></div>
                                        <h3>1980</h3>
                                        <h2><Link href="#">First Election <br /> Conducted</Link></h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 order-11">
                                    <div className="history-timeline__img style2">
                                        <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                        </div>
                                        <div className="inner">
                                            <img src="assets/images/resources/history-img2.jpg" alt="#" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6">
                                    <div className="history-timeline__img">
                                        <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                        </div>
                                        <div className="inner">
                                            <img src="assets/images/resources/history-img3.jpg" alt="#"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6">
                                    <div className="history-timeline__content">
                                        <div className="line"></div>
                                        <h3>2005</h3>
                                        <h2><Link href="#">Drawing Around <br /> City</Link></h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6 col-lg-6 order-22">
                                    <div className="history-timeline__content style2">
                                        <div className="line"></div>
                                        <h3>2015</h3>
                                        <h2><Link href="#">Becoming a Smart <br /> City</Link></h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                            urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                            egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                            posuere augue imperdiet arcu.</p>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 order-11">
                                    <div className="history-timeline__img style2">
                                        <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                        </div>
                                        <div className="inner">
                                            <img src="assets/images/resources/history-img4.jpg" alt="#" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End History Timeline */}

                {/*Start Cta Style1 */}
                <section className="cta-style1 cta-style1--style2">
                    <div className="cta-style1__bg" style={{backgroundImage: 'url(assets/images/shapes/cta-v2-shape1.png)'}}></div>
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="cta-style1__inner">
                                    <div className="cta-style1__title">
                                        <div className="sec-title">
                                            <div className="sub-title">
                                                <h6>Become Volunteer</h6>
                                            </div>
                                            <h2>Become a Volunteer, Service to Our <br /> City, & Make Difference!</h2>
                                        </div>
                                    </div>

                                    <div className="cta-style1__btn">
                                        <Link className="btn-one" href="#">
                                            <span className="txt">Become Volunteer</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End Cta Style1 */}
                </div>

            </Layout>
        </>
    )
}