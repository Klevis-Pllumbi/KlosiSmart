'use client'
import Link from "next/link"

export default function ResetPasswordPage() {
    return (
        <section className="login-page services-style1">
            {/* Shapes */}
            <div className="shape1"></div>
            <div className="shape2 rotate-me">
                <img src="assets/images/shapes/services-v1-shape1.png" alt="#" />
            </div>
            <div className="shape3 float-bob-y">
                <img src="assets/images/shapes/services-v1-shape2.png" alt="#" />
            </div>
            <div className="shape4">
                <img src="assets/images/shapes/services-v1-shape3.png" alt="#" />
            </div>

            <div className="auto-container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-10">
                        <div className="contact-page__form add-comment-box">
                            <div className="inner-title text-center">
                                <h2>Rivendos Fjalëkalimin</h2>
                                <p className="mt-3">Vendos fjalëkalimin e ri dhe konfirmoje atë</p>
                            </div>

                            <form id="contact-form" className="default-form2">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="form-group">
                                            <div className="input-box">
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    placeholder="Fjalëkalimi i ri"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <div className="form-group">
                                            <div className="input-box">
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Konfirmo Fjalëkalimin"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="button-box text-center">
                                            <button className="btn-one" type="submit">
                                                <span className="txt">Ruaj Fjalëkalimin</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center custom-links">
                                    <Link href="/login" className="custom-link">Kthehu te Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .contact-page__form .add-comment-box {
          margin-top: 0 !important;
        }

        .auto-container {
          margin-top: -100px;
          width: 100%;
        }

        .shape2.rotate-me,
        .shape3.float-bob-y {
          display: block !important;
        }

        @media (max-width: 768px) {
          .shape2.rotate-me { right: -50px; opacity: 0.5; }
          .shape3.float-bob-y { left: -50px; opacity: 0.5; }
        }
      `}</style>
        </section>
    )
}
