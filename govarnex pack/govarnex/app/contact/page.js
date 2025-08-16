
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Contact Us">
                <div>
                <section className="contact-page">
                    <div className="auto-container">
                    <div className="row">
                        {/* Start Contact Page Content */}
                        <div className="col-xl-4 col-lg-4">
                        <div className="contact-page__content">
                            <div className="title-box">
                            <h2>Mayor Office</h2>
                            <p>Mauris magna sit elementum elit facilis <br /> lacusacphar.</p>
                            </div>

                            <ul className="contact-page__contact-info">
                            <li>
                                <div className="icon-box">
                                <span className="icon-pin"></span>
                                </div>

                                <div className="text-box">
                                <h4>Mayor Office:</h4>
                                <p>New Hyde Park, NY 11040</p>
                                </div>
                            </li>

                            <li>
                                <div className="icon-box">
                                <span className="icon-telephone"></span>
                                </div>

                                <div className="text-box">
                                <h4>Phone No:</h4>
                                <p><Link href="tel:913336660021">(+91) 333 666 0021</Link></p>
                                </div>
                            </li>

                            <li>
                                <div className="icon-box">
                                <span className="icon-mail-1"></span>
                                </div>

                                <div className="text-box">
                                <h4>Email:</h4>
                                <p><Link href="mailto:example@govarnex.com">example@govarnex.com</Link></p>
                                </div>
                            </li>

                            <li>
                                <div className="icon-box">
                                <span className="icon-wall-clock"></span>
                                </div>

                                <div className="text-box">
                                <h4>Opening Hours:</h4>
                                <p>Mon - Fri: 8:00AM - 6:00PM</p>
                                </div>
                            </li>
                            </ul>

                            <ul className="contact-page__social-links">
                            <li><Link href="#"><span className="icon-facebook-app-symbol"></span></Link></li>
                            <li><Link href="#" className="bg2"><span className="icon-twitter"></span></Link></li>
                            <li><Link href="#" className="bg3"><span className="fab fa-pinterest-p"></span></Link></li>
                            <li><Link href="#" className="bg4"><span className="icon-instagram"></span></Link></li>
                            </ul>
                        </div>
                        </div>
                        {/* End Contact Page Content */}

                        {/* Start Contact Page Form */}
                        <div className="col-xl-8 col-lg-8">
                            <div className="contact-page__form">
                                <div className="add-comment-box">
                                <div className="inner-title">
                                    <h2>Leave A Comment</h2>
                                </div>

                                <form
                                    id="contact-form"
                                    name="contact_form"
                                    className="default-form2"
                                    action="/"
                                    method="post"
                                >
                                    <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_name" id="formName" placeholder="Your name" required="" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group">
                                        <div className="input-box">
                                            <input type="email" name="form_email" id="formEmail" placeholder="Your email" required="" />
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_phone"  id="formPhone" placeholder="Phone" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_subject"  id="formSubject" placeholder="Subject" />
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-xl-12">
                                        <div className="form-group">
                                        <div className="input-box">
                                            <textarea name="form_message" id="formMessage" placeholder="Type message" required=""></textarea>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col-xl-12">
                                        <div className="button-box">
                                        <input id="form_botcheck" name="form_botcheck" className="form-control" type="hidden" />
                                        <button className="btn-one" type="submit" data-loading-text="Please wait...">
                                            <span className="txt">Send Message</span>
                                        </button>
                                        </div>
                                    </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                        {/* End Contact Page Form */}
                    </div>
                    </div>
                </section>
                    
                    {/* Map Section */}
                    <section className="google-map">
                        {/*Map Outer*/}
                        <div className="map-outer">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.6895046810805!2d-122.52642526124438!3d38.00014098339506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085976736097a2f%3A0xbe014d20e6e22654!2sSan Rafael%2C California%2C Hoa Kỳ!5e0!3m2!1svi!2s!4v1678975266976!5m2!1svi!2s" height={570} style={{ border: 0, width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                        </div>
                    </section>
                </div>

            </Layout>
        </>
    )
}