import Link from "next/link"


export default function Features() {
    return (
        <>
            {/*Start Features Style2 */}
            <section className="features-style2">
                <div className="auto-container">
                    <div className="features-style2__inner">
                        <div className="shape1"><img src="assets/images/shapes/features-v2-shape1.png" alt="#" /></div>
                        <ul className="clearfix">
                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-3"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Emergjenca <br /> mjekësore</Link></h3>
                                    <p>Reagim i menjëhershëm dhe kujdes i specializuar në çdo rast emergjence.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-1"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Rendi & <br /> Siguria</Link></h3>
                                    <p>Garantojmë rend dhe siguri për një komunitet më të qetë.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-2"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Mjedisi & <br /> Riciklimi</Link></h3>
                                    <p>Bashkë për mbrojtjen e natyrës dhe kujdesin ndaj mjedisit.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-4"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Informacion mbi <br /> Turizmin</Link></h3>
                                    <p>Eksploroni historinë, kulturën dhe natyrën përreth jush.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}
                        </ul>
                    </div>
                </div>
            </section>
            {/*End Features Style2 */}
        </>
    )
}
