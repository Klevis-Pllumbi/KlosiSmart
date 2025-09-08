'use client'
import Link from "next/link"
import AlertContainer from "@/components/elements/AlertContainer"
import {useState} from "react";
import axios from "axios";
import Preloader from "@/components/elements/Preloader";

export default function RegisterPage() {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nid, setNid] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [
            ...prev,
            { id, type, title, description }
        ]);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    const validateNid = (nid) => /^[A-Z]\d{8}[A-Z]$/.test(nid);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !nid || !email || !password || !confirmPassword) {
            addAlert("error", "Fushë e zbrazët", "Ju lutemi plotësoni të gjitha fushat.");
            return;
        }

        if (!validateEmail(email)) {
            addAlert("error", "Email jo i vlefshëm", "Ju lutemi shkruani një email të saktë.");
            return;
        }

        if(!validatePassword(password)) {
            addAlert("error", "Password jo i vlefshëm", "Password duhet te ketë min 8 karaktere, shkronja të mëdha, të vogla, numra dhe karaktere speciale");
            return;
        }

        if(!validateNid(nid)) {
            addAlert("error", "NID jo i vlefshëm", "NID fillon dhe përfundon me shkronjë të madhe, dhe ka 8 numra në mes");
            return;
        }

        if (password !== confirmPassword) {
            addAlert("error", "Gabim në password", "Fjalëkalimi dhe konfirmimi nuk përputhen.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/register",
                { name: firstName, surname: lastName, nid, email, password },
                { withCredentials: true }
            );

            addAlert("success", "Regjistrim i suksesshëm", res.data.message || "Ju lutemi verifikoni email-in dhe .");

            setFirstName("");
            setLastName("");
            setNid("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
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
                addAlert("error", "Gabim", "Ndodhi një gabim gjatë regjistrimit.");
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
                        <div className="col-xl-8 col-lg-9 col-md-11">
                            <div className="contact-page__form add-comment-box">
                                <div className="inner-title text-center">
                                    <h2>Krijoni Llogarinë tuaj</h2>
                                </div>

                                <form id="contact-form" className="default-form2" onSubmit={handleSubmit}>
                                    {/* Emri & Mbiemri */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <div className="input-box">
                                                    <input
                                                        type="text"
                                                        name="first_name"
                                                        placeholder="Emri"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
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
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
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
                                                        value={nid}
                                                        onChange={(e) => setNid(e.target.value)}
                                                        
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
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
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
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                                    disabled={loading}
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
