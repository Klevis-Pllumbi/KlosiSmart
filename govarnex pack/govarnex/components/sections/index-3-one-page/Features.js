import Link from "next/link"


export default function Features() {
    return (
        <>
            {/*Start Features Style3 */}
            <section className="features-style3">
                <div className="auto-container">
                    <div className="row">
                        {/*Start Features Style3 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.1s">
                            <div className="features-style3__single">
                                <div className="inner">
                                    <div className="features-style3__single-icon">
                                        <span className="icon-Group"></span>
                                    </div>

                                    <div className="features-style3__single-content">
                                        <h2><Link href="#">Any Type of Medical <br /> Emergency</Link></h2>
                                        <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat
                                            pellentesque ante.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Features Style3 Single*/}

                        {/*Start Features Style3 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.2s">
                            <div className="features-style3__single">
                                <div className="inner">
                                    <div className="features-style3__single-icon">
                                        <span className="icon-Group-1"></span>
                                    </div>

                                    <div className="features-style3__single-content">
                                        <h2><Link href="#">For Police and Law <br /> Enforcement</Link></h2>
                                        <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat
                                            pellentesque ante.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Features Style3 Single */}

                        {/*Start Features Style3 Single */}
                        <div className="col-xl-4 col-lg-4 wow animated fadeInUp" data-wow-delay="0.3s">
                            <div className="features-style3__single">
                                <div className="inner">
                                    <div className="features-style3__single-icon">
                                        <span className="icon-Group-2"></span>
                                    </div>

                                    <div className="features-style3__single-content">
                                        <h2><Link href="#">Recycling & Garbage <br /> Related</Link></h2>
                                        <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat
                                            pellentesque ante.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Features Style3 Single */}
                    </div>
                </div>
            </section>
            {/*End Features Style3 */}
        </>
    )
}
