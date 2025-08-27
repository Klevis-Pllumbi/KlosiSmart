import TestimonialSlider05 from "@/components/slider/TestimonialSlider05"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Health & Medical Department">
                <div>
                {/*Start Departments Details */}
                <section className="departments-details">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Departments Details Sidebar */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="departments-details__sidebar">
                                    <div className="departments-details__sidebar-single">
                                        <div className="title">
                                            <h2>All Departments</h2>
                                        </div>

                                        <ul className="departments-details__sidebar-single-list">
                                            <li><Link href="#">Government and Election</Link></li>
                                            <li><Link href="#">Health & Medical Department</Link></li>
                                            <li><Link href="#">Employment & Job Planning</Link></li>
                                            <li><Link href="#">Real Estate and Building</Link></li>
                                            <li><Link href="#">Business Tax and Finance</Link></li>
                                            <li><Link href="#">Finance & Legal Department</Link></li>
                                        </ul>
                                    </div>

                                    <div className="departments-details__sidebar-single contact-info">
                                        <div className="title">
                                            <h2>Get In Touch</h2>
                                        </div>
                                        <div className="text-box">
                                            <p>Mauris magna sit elementum elit facilis lacusacphar.</p>
                                        </div>

                                        <ul className="departments-details__sidebar-single-contact-list">
                                            <li>
                                                <div className="icon-box">
                                                    <span className="icon-telephone"></span>
                                                </div>
                                                <div className="text">
                                                    <p><Link href="tel:913336660021">(+91) 333 666 0021</Link></p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon-box">
                                                    <span className="icon-mail-1"></span>
                                                </div>
                                                <div className="text">
                                                    <p><Link href="mailto:yourmail@email.com">example@govarnex.com</Link></p>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="icon-box">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>New Hyde Park, NY 11040</p>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            {/*End Departments Details Sidebar */}



                            {/*Start Departments Details Content */}
                            <div className="col-xl-8 col-lg-7">
                                <div className="departments-details__content">
                                    <div className="departments-details__content-img1">
                                        <img src="assets/images/resources/departments-details-img1.jpg" alt="#" />
                                    </div>
                                    <div className="departments-details__content-text1">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et enim justo, in
                                            mauris posuere dolor. Dolor felis sapien sit egestas. Ut venenatis faucibus non sed
                                            faucibus mauris ultricies. Cras varius proin amet vehicula magna. Ultricies gravida
                                            vel volutpat sed. Platea sed fames at egestas amet feugiat laoreet potenti integer.
                                            Viverra at maecenas convallis condimentum egestas nunc sagittis eu. Semper faucibus
                                            facilisis vitae sollicitudin.</p>
                                    </div>

                                    <div className="departments-details__content-text2">
                                        <p>Fringilla mauris magna sit elementum elit. Facilisi lacus, pharetra quam eu urna
                                            amet aenean. Nunc mattis vitae tellus bibendum a eu, nunc. Consequat commodo ac
                                            cursus in donec orci tempus. Massa sed sit faucibus neque ac. Nibh nisl nisl id
                                            fermentum habitant consequat. A ornare in dis sit cras natoque morbi. Phasellus
                                            senectus tortor sed magnis. Egestas nunc pellentesque egestas gravida amet.</p>
                                    </div>

                                    <div className="departments-details__content-text3">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="content-box">
                                                    <h2>How We Help People</h2>
                                                    <p>Mauris magna sit elementum elit. Facilis lacusacphar etra quam eu urna
                                                        amet
                                                        aenean Nunc mattis vitae tellus bibendum.</p>
                                                    <ul>
                                                        <li>
                                                            <div className="icon">
                                                                <span className="icon-check-mark"></span>
                                                            </div>

                                                            <div className="text">
                                                                <p>Holiday Trash & Recycling</p>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="icon">
                                                                <span className="icon-check-mark"></span>
                                                            </div>

                                                            <div className="text">
                                                                <p>Things To Do In Govarnex</p>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="icon">
                                                                <span className="icon-check-mark"></span>
                                                            </div>

                                                            <div className="text">
                                                                <p>Rent a Picnic Shelter</p>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="icon">
                                                                <span className="icon-check-mark"></span>
                                                            </div>

                                                            <div className="text">
                                                                <p>Contact City Action Center</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="col-xl-6">
                                                <div className="img-box">
                                                    <img src="assets/images/resources/departments-details-img2.jpg" alt="#" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="departments-details__content-text4">
                                        <h2>Cultural Statue</h2>
                                        <p>Egestas amet feugiat laoreet potenti integer. Viverra at maecenas convallis
                                            condimentum egestas nunc sagittis eu. Semper faucibus facilisis vitae sollicitudin.
                                        </p>
                                    </div>

                                    <div className="departments-details__content-text5">
                                        <div className="row">
                                            <div className="col-xl-12">
                                                <div className="departments-details__content-text5-inner">
                                                    <TestimonialSlider05/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="departments-details__content-button">
                                        <div className="title">
                                            <h2>Download Resources</h2>
                                        </div>
                                        <div className="departments-details__content-button-single">
                                            <div className="left">
                                                <div className="icon-box">
                                                    <span className="icon-pdf"></span>
                                                </div>
                                                <div className="text-box">
                                                    <h4>Company Briefing Update for the Year</h4>
                                                    <p>Pdf(160kb)</p>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="button-box">
                                                    <Link href="#">Download</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="departments-details__content-button-single">
                                            <div className="left">
                                                <div className="icon-box">
                                                    <span className="icon-pdf"></span>
                                                </div>
                                                <div className="text-box">
                                                    <h4>Cultural Centers and Event schedule</h4>
                                                    <p>Pdf(160kb)</p>
                                                </div>
                                            </div>
                                            <div className="right">
                                                <div className="button-box">
                                                    <Link href="#">Download</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/*End Departments Details Content */}
                        </div>
                    </div>
                </section>
                {/*End Departments Details */}

                {/*Start Newsletter Style1 */}
                <section className="newsletter-style1">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Newsletter Style1 Title */}
                            <div className="col-xl-4">
                                <div className="newsletter-style1__title">
                                    <h2>Subscribe To Our <br/> Newsletter</h2>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Title */}

                            {/*Start Newsletter Style1 Form */}
                            <div className="col-xl-8">
                                <div className="newsletter-style1__form">
                                    <form action="/" className="comment-one__form contact-form-validated">
                                        <div className="newsletter-style1__form-inner">
                                            <ul>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input type="text" placeholder="Your name" name="name" />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input type="email" placeholder="Your email" name="email" />
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="newsletter-style1__form-btn">
                                                <button type="submit" className="btn-one newsletter-style1__form-btn">
                                                    <span className="txt">Subscribe Now</span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Form */}
                        </div>
                    </div>
                </section>
                {/*End Newsletter Style1 */}
                </div>

            </Layout>
        </>
    )
}