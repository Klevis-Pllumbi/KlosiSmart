'use client'
import Link from "next/link"
import AlertContainer from "@/components/elements/AlertContainer"
import {useEffect, useState} from "react";

export default function RegisterPage() {

    const [alerts, setAlerts] = useState([]);

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [
            ...prev,
            { id, type, title, description }
        ]);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
        console.log("removeAlert", id);
    };

    useEffect(() => {
        addAlert("error", "Error!", "Something went wrong...")
        addAlert("success", "Error!", "Something went wrong...")
        addAlert("warning", "Error!", "Something went wrong...")
        addAlert("info", "", "Something went wrong...")
    }, [])

    return (
        <>
            <AlertContainer alerts={alerts} onClose={removeAlert} />
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
                        <div className="col-xl-8 col-lg-9 col-md-11">
                            <div className="contact-page__form add-comment-box">
                                <div className="inner-title text-center">
                                    <h2>Krijoni Llogarinë tuaj</h2>
                                </div>

                                <form id="contact-form" className="default-form2" action="/api/register" method="post">
                                    {/* Emri & Mbiemri */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        placeholder="Emri"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        name="last_name"
                                                        placeholder="Mbiemri"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* NID & Email */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        name="nid"
                                                        placeholder="Numri Personal (NID)"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password & Confirm Password */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Fjalëkalimi"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="password"
                                                        name="confirm_password"
                                                        placeholder="Konfirmo Fjalëkalimin"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Butoni */}
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="button-box text-center">
                                                <button
                                                    className="btn-one"
                                                    type="submit"
                                                    data-loading-text="Ju lutemi prisni..."
                                                >
                                                    <span className="txt">Regjistrohu</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Link Login */}
                                    <div className="text-center custom-links">
                                        <p>
                                            Tashmë e keni një llogari?{" "}
                                            <Link href="/login" className="custom-link">Login</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                }

                .login-page .auto-container {
                    width: 100%;
                }

                .shape2.rotate-me,
                .shape3.float-bob-y {
                    display: block !important;
                }

                @media (max-width: 768px) {
                    .shape2.rotate-me {
                        right: -50px;
                        opacity: 0.5;
                    }
                    .shape3.float-bob-y {
                        left: -50px;
                        opacity: 0.5;
                    }
                }
            `}</style>
        </>
    )
}
