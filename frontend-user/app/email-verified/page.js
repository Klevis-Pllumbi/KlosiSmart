'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Preloader from "@/components/elements/Preloader";

export default function EmailVerifiedPage() {

    const searchParams = useSearchParams();
    const status = searchParams.get("status");
    const [loading, setLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const message = status === "success"
        ? "Email juaj u verifikua me sukses!"
        : "Verifikimi i email-it dështoi. Ju lutemi kontaktoni mbështetjen.";

    const button = status === "success"
        ? <Link href="/login" className="btn-one"><span className="txt">Shko te Login</span></Link>
        : <Link href="/contact" className="btn-one"><span className="txt">Shko te Kontakt</span></Link>;

    const emoji = status === "success" ? "✔️" : "❌";

    return (
        <>
            {loading && <Preloader />}
            <section className="login-page services-style1" style={{ height: "100vh", minHeight: "100vh" }}>
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
                            <div className={`contact-page__form add-comment-box ${showContent ? "fade-in" : ""}`} style={{ textAlign: "center", padding: "50px", paddingBottom: "20px" }}>
                                <div className="status-emoji" style={{ padding: "20px" }}>{emoji}</div>
                                <h2 style={{ padding: "20px" }}>{message}</h2>
                                <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                                    {button}
                                </div>
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
                    justify-content: center;
                }

                .contact-page__form .add-comment-box {
                    margin-top: 0 !important;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s ease;
                }

                .contact-page__form.add-comment-box.fade-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .status-emoji {
                    font-size: 80px;
                    margin-bottom: 20px;
                    animation: bounce 0.8s ease;
                }

                @keyframes bounce {
                    0% { transform: scale(0.5); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
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
