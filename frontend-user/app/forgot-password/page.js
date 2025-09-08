'use client'
import Link from "next/link"
import AlertContainer from "@/components/elements/AlertContainer"
import { useState } from "react";
import axios from "axios";
import Preloader from "@/components/elements/Preloader";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            addAlert("error", "Fushë e zbrazët", "Ju lutemi vendosni email-in tuaj.");
            return;
        }

        if (!validateEmail(email)) {
            addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/forgot-password",
                { email },
                { withCredentials: true }
            );

            addAlert("success", "Mesazh i dërguar", res.data.message || "Do të merrni një link për të rivendosur fjalëkalimin tek email-i i dhënë");

            setEmail("");
        } catch (err) {
            const data = err.response?.data;

            if (Array.isArray(data)) {
                data.forEach(msg => addAlert("error", "Gabim", msg));
            } else if (Array.isArray(data?.errors)) {
                data.errors.forEach(msg => addAlert("error", "Gabim", msg));
            } else if (data?.message) {
                addAlert("error", "Gabim", data.message);
            } else if (data?.error) {
                addAlert("error", "Gabim", data.error);
            } else {
                addAlert("error", "Gabim", "Ndodhi një gabim gjatë dërgimit të email-it.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Preloader />}
            <AlertContainer alerts={alerts} onClose={removeAlert} />
            <section className="login-page services-style1" style={{ height: "100vh", minHeight: "100vh" }}>
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
                                    <h2>Harrove Fjalëkalimin</h2>
                                    <p className="mt-3">Vendos email-in tënd dhe do të marrësh një link në email për të rivendosur fjalëkalimin</p>
                                </div>

                                <form id="contact-form" className="default-form2" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="button-box text-center">
                                                <button className="btn-one" type="submit" disabled={loading}>
                                                    <span className="txt">Dërgo Linkun</span>
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
        </>
    )
}
