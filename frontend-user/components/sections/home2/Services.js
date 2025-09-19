import Link from "next/link"


export default function Services() {
    return (
        <>
            {/*Start Services Style1 */}
            <section className="services-style1 services-style1--style2">
                <div className="shape1"></div>
                <div className="shape2 rotate-me"><img src="/assets/images/shapes/services-v2-shape1.png" alt="#" /></div>
                <div className="shape3 float-bob-y"><img src="/assets/images/shapes/services-v2-shape2.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>EFIÇENSË & GJITHËPËRFSHIRJE</h6>
                        </div>
                        <h2>Shërbimet Online <br/> më të përdorura</h2>
                    </div>
                    <div className="row">
                        {/*Start Services Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="0ms"
                             data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img
                                        src="/assets/images/services/opinion.png"
                                        alt="#"
                                        style={{width: "410px", height: "350px", objectFit: "cover"}}
                                    />
                                </div>
                                <div className="services-style1__single-content text-center">
                                    <div className="services-style1__single-icon">
                                        <span className="icon-Group-5"></span>
                                    </div>
                                    <div className="services-style1__single-text">
                                        <h3><Link href="/surveys"> Jepni Opinionin <br/> Tuaj</Link></h3>
                                        <div className="btn-box">
                                            <Link href="/surveys"><span className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Services Style1 Single */}

                        {/*Start Services Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInRight" data-wow-delay="100ms"
                             data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img
                                        src="/assets/images/services/chatbot.png"
                                        alt="#"
                                        style={{width: "410px", height: "350px", objectFit: "cover"}}
                                    />
                                </div>
                                <div className="services-style1__single-content text-center">
                                    <div className="services-style1__single-icon">
                                        <span className="icon-comment"></span>
                                    </div>
                                    <div className="services-style1__single-text">
                                        <h3><Link href="/virtual-assistant"> Pyesni Asistentin <br/> Virtual</Link></h3>
                                        <div className="btn-box">
                                            <Link href="/virtual-assistant"><span
                                                className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Services Style1 Single */}

                        {/*Start Services Style1 Single */}
                        <div className="col-xl-4 col-lg-4 wow fadeInLeft" data-wow-delay="200ms"
                             data-wow-duration="1500ms">
                            <div className="services-style1__single">
                                <div className="services-style1--style2__img">
                                    <img
                                        src="/assets/images/services/report.png"
                                        alt="#"
                                        style={{width: "410px", height: "350px", objectFit: "cover"}}
                                    />
                                </div>
                                <div className="services-style1__single-content text-center">
                                    <div className="services-style1__single-icon">
                                        <span className="icon-mail"></span>
                                    </div>
                                    <div className="services-style1__single-text">
                                        <h3><Link href="/report"> Raportoni Probleme & <br/> Shqetësime</Link></h3>
                                        <div className="btn-box">
                                            <Link href="/report"><span className="icon-right-arrow"></span></Link>
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
