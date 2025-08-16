import Link from "next/link"

export default function About() {
    return (
        <>
            {/*Start About Style1 */}
            <section className="about-style1" id="about">
                <div className="auto-container">
                    <div className="row">

                        <div className="col-xl-6">
                            <div className="about-style1__content">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>About Leader</h6>
                                    </div>
                                    <h2>Meet <span>Ideological</span> <br /> Leader for Youth <br />Generation</h2>
                                </div>
                                <div className="about-style1__content-text">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                        urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                        egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                        posuere augue imperdiet arcu.</p>
                                </div>
                                <div className="about-style1__content-signature">
                                    <img src="assets/images/resources/about-v1-signature.png" alt="#" />
                                </div>
                                <ul className="about-style1__content-list">
                                    <li>
                                        <div className="icon-box">
                                            <span className="icon-check"></span>
                                        </div>
                                        <div className="text-box">
                                            <p>Improving all types of opportunities</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="icon-box">
                                            <span className="icon-check"></span>
                                        </div>
                                        <div className="text-box">
                                            <p>Quick solutions for daily problems</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="icon-box">
                                            <span className="icon-check"></span>
                                        </div>
                                        <div className="text-box">
                                            <p>Community that grows larger</p>
                                        </div>
                                    </li>
                                </ul>

                                <div className="about-style1__content-btn">
                                    <Link className="btn-one" href="/about">
                                        <span className="txt">Report an Issues</span>
                                    </Link>
                                </div>
                            </div>
                        </div>


                        <div className="col-xl-6">
                            <div className="about-style1__img">
                                <div className="shape1 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                </div>
                                <div className="shape2 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                                <div className="shape3"></div>
                                <div className="about-style1__img-inner">
                                    <img src="assets/images/about/about-v1-img1.png" alt="#" />
                                </div>
                                <div className="experience-box text-center">
                                    <h2>
                                        <span className="odometer" data-count="20">20</span>
                                    </h2>
                                    <div className="title">
                                        <h3> Years Of <br /> Exps</h3>
                                    </div>
                                </div>

                                <div className="about-style1__img-client-info">
                                    <h3>Jordon Cooper</h3>
                                    <p>City Mayor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End About Style1 */}
        </>
    )
}
