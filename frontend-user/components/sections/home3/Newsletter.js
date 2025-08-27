import Link from "next/link"


export default function Newsletter() {
    return (
        <>
            {/*Start Newsletter Style1 */}
            <section className="newsletter-style1">
                <div className="auto-container">
                    <div className="row">
                        {/*Start Newsletter Style1 Title */}
                        <div className="col-xl-4">
                            <div className="newsletter-style1__title">
                                <h2>Subscribe To Our <br /> Newsletter</h2>
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
            {/* End Newsletter Style1*/}
        </>
    )
}
