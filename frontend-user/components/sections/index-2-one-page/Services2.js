import Link from "next/link"


export default function Services2() {
    return (
        <>
            {/*Start Instant Services Style1 */}
            <section className="instant-services-style1 instant-services-style1--style2">
                <div className="shape1 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                <div className="instant-services-style1--style2__bg"></div>
                <div className="auto-container">
                    <div className="row">
                        {/*Start Instant Services Style1 Img */}
                        <div className="col-xl-4">
                            <div className="instant-services-style1--style2__title">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>Instant Services</h6>
                                    </div>
                                    <h2>Quick Services <br /> From The City <br /> Municipal</h2>
                                </div>
                                <div className="text-box">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit donec felis, suscipit mi urna
                                        nulla at tincidunt.</p>
                                </div>
                            </div>
                        </div>
                        {/*End Instant Services Style1 Img */}

                        {/*Start Instant Services Style1 Content */}
                        <div className="col-xl-8">
                            <div className="instant-services-style1__content">
                                <div className="shape2 float-bob-y"><img src="assets/images/shapes/instant-services-v2-shape1.png" alt="#" />
                                </div>
                                <div className="instant-services-style1__content-bottom">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="instant-services-style1__content-bottom-single">
                                                <ul>
                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Holiday Trash & Recycling</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Things To Do In Govarnex</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Rent a Picnic Shelter</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Contact City Action Center</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Youth Activities Details</Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="instant-services-style1__content-bottom-single">
                                                <ul>
                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Fishing or Boating Permit</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Get a Birth / Death Certificate
                                                            </Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Register My Property Online</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Apply for Submit a Tax Papers
                                                            </Link>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Instant Services Style1 Content */}
                    </div>
                </div>
            </section>
            {/*End Instant Services Style1 */}
        </>
    )
}
