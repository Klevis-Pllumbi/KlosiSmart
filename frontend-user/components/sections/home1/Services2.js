
import Link from "next/link"


export default function Services2() {
    return (
        <>
            {/*Start Instant Services Style1 */}
            <section className="instant-services-style1">
                <div className="shape2 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="row">
                        {/*Start Instant Services Style1 Img */}
                        <div className="col-xl-6">
                            <div className="instant-services-style1__img">
                                <div className="shape1 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                </div>
                                <div className="instant-services-style1__img-inner">
                                    <img src="assets/images/services/instant-services-v1-img1.jpg" alt="#" />
                                </div>
                            </div>
                        </div>
                        {/*End Instant Services Style1 Img */}

                        {/*Start Instant Services Style1 Content */}
                        <div className="col-xl-6">
                            <div className="instant-services-style1__content">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>Të gjitha shërbimet</h6>
                                    </div>
                                    <h2>Shërbimet që ofrohen nga platforma KlosiSmart</h2>
                                </div>

                                <div className="instant-services-style1__content-text">
                                    <p>Këtu do të gjeni të gjitha shërbimet që ofron kjo platformë për qytetarët.</p>
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
                                                            <Link href="#">Njihuni me vendet turistike</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Ndiqni lajmet më të fundit</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Zgjidhni eventet që dëshironi të
                                                                ndiqni</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Raportoni problemet që hasni</Link>
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
                                                            <Link href="#">Jepni opinionin tuaj</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Pyesni asistentin virtual</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Abonohuni për të mos humbur asgjë</Link>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <div className="icon">
                                                            <span className="icon-check-mark"></span>
                                                        </div>
                                                        <div className="text">
                                                            <Link href="#">Kërkoni diçka ose lini një koment</Link>
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
