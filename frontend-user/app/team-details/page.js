
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Team Details">
            {/*Start Team Details */}
            <section className="team-details">
                {/*Start Team Details Top */}
                <div className="team-details__top">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-5">
                                <div className="team-details__top-img">
                                    <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                    </div>
                                    <div className="inner">
                                        <img src="assets/images/team/team-details-img1.jpg" alt="#" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-7">
                                <div className="team-details__top-content">
                                    <div className="title">
                                        <h2>Brendan Fraser</h2>
                                        <span>Councilor</span>
                                    </div>
                                    <div className="text-box">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo sem diam et,
                                            sollicitudin eget. Tellus velit etiam elit, mi pretium eu. Suspendisse imperdiet
                                            enim ornare elit, eu vestibulum enim imperdiet viverra. Elementum habitant non
                                            mi est nec nunc. Orci odio dignissim aliquam dapibus duis. Faucibus velit amet
                                            vitae sed orc.</p>
                                    </div>

                                    <div className="team-details__top-content-signature">
                                        <img src="assets/images/resources/team-details-signature.png" alt="#" />
                                    </div>

                                    <ul className="team-details__top-content-contact-info">
                                        <li>
                                            <p><span>Expertise:</span> Strategy, Leadership</p>
                                        </li>
                                        <li>
                                            <p><span>Experience:</span> 20 Years</p>
                                        </li>
                                        <li>
                                            <p><span>Email:</span> <Link href="mailto:yourmail@email.com">brendan@gmail.com</Link>
                                            </p>
                                        </li>
                                        <li>
                                            <p><span>Phone:</span> <Link href="tel:913336660021">(+91) 333 666 0021</Link></p>
                                        </li>
                                    </ul>
                                    <ul className="team-details__top-content-social-links">
                                        <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                                        <li><Link href="#"><span className="icon-twitter"></span></Link></li>
                                        <li><Link href="#"><span className="icon-instagram"></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Team Details Top */}

                {/*Start Team Details Middle */}
                <div className="team-details__middle">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="team-details__middle-inner">
                                    <div className="title">
                                        <h2>Biography</h2>
                                    </div>
                                    <p className="team-details__middle-text1">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit. Duis et enim justo, in mauris posuere dolor. Dolor felis sapien sit egestas.
                                        Ut venenatis faucibus non sed faucibus mauris ultricies. Cras varius proin amet
                                        vehicula magna. Ultricies gravida vel volutpat sed. Platea sed fames at egestas amet
                                        feugiat laoreet potenti integer. Viverra at maecenas convallis condimentum egestas
                                        nunc sagittis eu. Semper faucibus facilisis vitae sollicitudin.</p>

                                    <p className="team-details__middle-text2"> Fringilla mauris magna sit elementum elit.
                                        Facilisi lacus, pharetra quam eu urna amet aenean. Nunc mattis vitae tellus bibendum
                                        a eu, nunc. Consequat commodo ac cursus in donec orci tempus. Massa sed sit faucibus
                                        neque ac. Nibh nisl nisl id fermentum habitant consequat. A ornare in dis sit cras
                                        natoque morbi. Phasellus senectus tortor sed magnis. Egestas nunc pellentesque
                                        egestas gravida amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Team Details Top */}

                {/*Start Team Details Middle */}
                <div className="team-details__bottom">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Team Details Skills Box */}
                            <div className="col-xl-6">
                                <div className="team-details__skills-box">
                                    <div className="title">
                                        <h2>My Skills</h2>
                                    </div>
                                    <div className="text-box">
                                        <p>Mollis aliquet nisl gravida vitae dignissim sollicitudin sit nisi est ornare
                                            curabitur quam sit mi viverra vulputate elit. Felis in tristique a pellentesque.
                                            Eestibulum vivamus in vitae ut pulvinar.</p>
                                    </div>

                                   {/* Start Team Details Skills Box Single*/}
                                    <div className="team-details__skills-box-single">
                                        <h4 className="team-details__skills-box-single-title">Management</h4>
                                        <div className="bar">
                                            <div className="count-text">75%</div>
                                            <div className="bar-inner1 " data-percent="75%"> </div>
                                        </div>
                                    </div>
                                    {/*End Team Details Skills Box Single */}

                                    {/*Start Team Details Skills Box Single */}
                                    <div className="team-details__skills-box-single">
                                        <h4 className="team-details__skills-box-single-title">Public Speaking</h4>
                                        <div className="bar">
                                            <div className="count-text">90%</div>
                                            <div className="bar-inner2" data-percent="90%"> </div>
                                        </div>
                                    </div>
                                    {/*End Team Details Skills Box Single */}
                                    {/*Start Team Details Skills Box Single */}
                                    <div className="team-details__skills-box-single">
                                        <h4 className="team-details__skills-box-single-title">Problem Solving</h4>
                                        <div className="bar">
                                            <div className="count-text">80%</div>
                                            <div className="bar-inner3" data-percent="80%"> </div>
                                        </div>
                                    </div>
                                    {/*End Team Details Skills Box Single */}

                                    {/*Start Team Details Skills Box Single */}
                                    <div className="team-details__skills-box-single">
                                        <h4 className="team-details__skills-box-single-title">Strategy Planning</h4>
                                        <div className="bar">
                                            <div className="count-text">70%</div>
                                            <div className="bar-inner4" data-percent="70%"> </div>
                                        </div>
                                    </div>
                                    {/*End Team Details Skills Box Single */}
                                </div>
                            </div>
                            {/*End Team Details Skills Box */}
                            {/*Start Team Details Bottom Education */}
                            <div className="col-xl-6">
                                <div className="team-details__bottom-education">
                                    <div className="title">
                                        <h2>Education</h2>
                                    </div>
                                    <div className="row">
                                        {/*Start Team Details Bottom Education Single */}
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="team-details__bottom-education-single">
                                                <div className="date-box">
                                                    <span>1995 - 1999</span>
                                                </div>
                                                <h3>Master of Political Science</h3>
                                                <p>Cars varius proin amet at vehicula magna. Platea sed fames at egestas
                                                    amet feugiat.</p>
                                            </div>
                                        </div>
                                        {/*End Team Details Bottom Education Single */}

                                        {/* Start Team Details Bottom Education Single*/}
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="team-details__bottom-education-single">
                                                <div className="date-box">
                                                    <span>1995 - 1999</span>
                                                </div>
                                                <h3>Occidental College in LA</h3>
                                                <p>Cars varius proin amet at vehicula magna. Platea sed fames at egestas
                                                    amet feugiat.</p>
                                            </div>
                                        </div>
                                        {/*End Team Details Bottom Education Single */}

                                        {/* Start Team Details Bottom Education Single*/}
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="team-details__bottom-education-single">
                                                <div className="date-box">
                                                    <span>1995 - 1999</span>
                                                </div>
                                                <h3>Occidental College in LA</h3>
                                                <p>Cars varius proin amet at vehicula magna. Platea sed fames at egestas
                                                    amet feugiat.</p>
                                            </div>
                                        </div>
                                        {/*End Team Details Bottom Education Single */}

                                        {/* Start Team Details Bottom Education Single*/}
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="team-details__bottom-education-single">
                                                <div className="date-box">
                                                    <span>1995 - 1999</span>
                                                </div>
                                                <h3>Occidental College in LA</h3>
                                                <p>Cars varius proin amet at vehicula magna. Platea sed fames at egestas
                                                    amet feugiat.</p>
                                            </div>
                                        </div>
                                        {/*End Team Details Bottom Education Single */}
                                    </div>
                                </div>
                            </div>
                            {/*End Team Details Bottom Education */}

                        </div>
                    </div>
                </div>
                {/*End Team Details Bottom */}

            </section>
            {/*End Team Details */}


            {/*Start Cta Style1 */}
            <section className="cta-style1 cta-style1--style2">
                <div className="cta-style1__bg" style={{ backgroundImage: 'url(assets/images/shapes/cta-v2-shape1.png)'}}></div>
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

            </Layout>
        </>
    )
}