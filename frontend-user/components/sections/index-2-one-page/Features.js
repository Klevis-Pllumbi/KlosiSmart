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
                                    <h3><Link href="#">Any Type of Medical <br /> Emergency</Link></h3>
                                    <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat pellentesque
                                        ante.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-1"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">For Police and Law <br /> Enforcement</Link></h3>
                                    <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat pellentesque
                                        ante.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-2"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Recycling & Garbage <br /> Related</Link></h3>
                                    <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat pellentesque
                                        ante.</p>
                                </div>
                            </li>
                            {/*End Features Style1 Single */}

                            {/*Start Features Style1 Single */}
                            <li className="features-style2__single text-center">
                                <div className="features-style2__single-icon">
                                    <span className="icon-Group-4"></span>
                                </div>

                                <div className="features-style2__single-content">
                                    <h3><Link href="#">Travel & Tourism <br /> Information</Link></h3>
                                    <p>Facilisis orci magna ullamcorper orci ultricies egestas dolor volutpat pellentesque
                                        ante.</p>
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
