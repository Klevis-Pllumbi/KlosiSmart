import Link from "next/link"


export default function Cta() {
    return (
        <>
            {/*Start Cta Style1 */}
            <section className="cta-style1">
                <div className="cta-style1__bg" style={{backgroundImage: 'url(assets/images/backgrounds/cta-v1-bg.png)'}}></div>
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
        </>
    )
}
