import Link from "next/link"


export default function Features() {
    return (
        <>
            {/*Start Features Style1 */}
            <section className="features-style1">
                <div className="shape1 wow slideInLeft" data-wow-delay="100ms" data-wow-duration="3500ms"></div>
                <div className="shape2"><img src="assets/images/shapes/features-v1-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="features-style1__inner">
                        <div className="row">
                            {/*Start Features Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="00ms"
                                data-wow-duration="1500ms">
                                <div className="features-style1__single">
                                    <div className="features-style1__single-icon">
                                        <span className="icon-Group-3"></span>
                                    </div>

                                    <div className="features-style1__single-content">
                                        <h3><Link href="#">Any Type of Medical <br /> Emergency</Link></h3>
                                        <p>Tortor neque sed tellus est
                                            eget dui id ante tristique tristique dolor.</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms"
                                data-wow-duration="1500ms">
                                <div className="features-style1__single">
                                    <div className="features-style1__single-icon">
                                        <span className="icon-Group-1"></span>
                                    </div>

                                    <div className="features-style1__single-content">
                                        <h3><Link href="#">For Police and Law <br />Enforcement</Link></h3>
                                        <p>Tortor neque sed tellus est
                                            eget dui id ante tristique tristique dolor.</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms"
                                data-wow-duration="1500ms">
                                <div className="features-style1__single">
                                    <div className="features-style1__single-icon">
                                        <span className="icon-Group-2"></span>
                                    </div>

                                    <div className="features-style1__single-content">
                                        <h3><Link href="#">Recyling & Garbage <br /> Related</Link></h3>
                                        <p>Tortor neque sed tellus est
                                            eget dui id ante tristique tristique dolor.</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms"
                                data-wow-duration="1500ms">
                                <div className="features-style1__single">
                                    <div className="features-style1__single-icon">
                                        <span className="icon-Group-4"></span>
                                    </div>

                                    <div className="features-style1__single-content">
                                        <h3><Link href="#">Travel & Tourism <br />Information</Link></h3>
                                        <p>Tortor neque sed tellus est
                                            eget dui id ante tristique tristique dolor.</p>
                                    </div>
                                </div>
                            </div>
                            {/*End Features Style1 Single */}
                        </div>
                    </div>
                </div>
            </section>
            {/*End Features Style1 */}
        </>
    )
}
