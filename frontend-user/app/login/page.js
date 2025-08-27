'use client'
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AlertContainer from "@/components/elements/AlertContainer";
import { useAuth } from "@/context/AuthContext";
import Preloader from "@/components/elements/Preloader";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirectUrl = searchParams.get("redirect") || "/";
    const {loginUser} = useAuth();

    const [alerts, setAlerts] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, {id, type, title, description}]);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!validateEmail(email)) {
            addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
            return;
        }

        if (!password) {
            addAlert("error", "Password i zbrazët", "Ju lutemi shkruani password.");
            return;
        }

        setLoading(true);
        const res = await loginUser(email, password);
        setLoading(false);

        if (res.success) router.push(redirectUrl);
        else addAlert("error", "Error", res.message);
    };

    return (
        <>
            {loading && <Preloader />}
            <AlertContainer alerts={alerts} onClose={removeAlert}/>
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
                                    <h2>Login në Llogarinë tënde</h2>
                                </div>

                                <form id="contact-form" className="default-form2" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="email"
                                                        name="form_email"
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
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="password"
                                                        name="form_password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="button-box text-center">
                                                <button className="btn-one" type="submit" disabled={loading}>
                                                    <span className="txt">Login</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center custom-links">
                                        <Link href="/forgot-password" className="custom-link">Harruat
                                            Fjalëkalimin?</Link>
                                        <p>
                                            Nuk keni një llogari?{" "}
                                            <Link href="/register" className="custom-link">Regjistrohu</Link>
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
    );
}
