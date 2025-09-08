'use client'
import {useAuth} from "@/context/AuthContext";

export default function Newsletter() {

    const { user } = useAuth();

    return (
        <>
            {/*Start Newsletter Style1 */}
            <section className="newsletter-style1">
                <div className="auto-container">
                    <div className="row">
                        {/*Start Newsletter Style1 Title */}
                        <div className="col-xl-4">
                            <div className="newsletter-style1__title">
                                <h2>Abonohuni për të <br />mos humbur asgjë </h2>
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
                                                    <input type="text"
                                                           placeholder="Emri"
                                                           name="name"
                                                           value = {user ? user.fullName : ""}
                                                    />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="comment-form__input-box">
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        value = {user ? user.email : ""}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="newsletter-style1__form-btn">
                                            <button type="submit" className="btn-one newsletter-style1__form-btn">
                                                <span className="txt">Abonohu Tani</span></button>
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
        </>
    )
}
