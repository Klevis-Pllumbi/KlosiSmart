import { useState } from "react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import AlertContainer from "@/components/elements/AlertContainer";

export default function SurveyForm({ survey }) {
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
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
    };

    const handleChange = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleCheckboxChange = (questionId, optionId, checked) => {
        setAnswers((prev) => {
            const prevAnswers = prev[questionId] || [];
            if (checked) {
                return { ...prev, [questionId]: [...prevAnswers, optionId] };
            } else {
                return {
                    ...prev,
                    [questionId]: prevAnswers.filter((a) => a !== optionId),
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const missingAnswers = survey.questions.filter((q) =>
                (q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_CHOICE") &&
                (!answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0))
            );

            if (missingAnswers.length > 0) {
                addAlert(
                    "error",
                    "Pyetje pa përgjigje",
                    `Ju lutem përgjigjuni të gjitha pyetjeve të detyrueshme (me alternativa).`
                );
                setLoading(false);
                return;
            }

            const payload = {
                surveyId: survey.id,
                answers: survey.questions.map((q) => {
                    const ans = answers[q.id];
                    if (q.type === "OPEN_TEXT") {
                        return { questionId: q.id, selectedOptionIds: [], openAnswer: ans || "" };
                    } else if (q.type === "SINGLE_CHOICE") {
                        return { questionId: q.id, selectedOptionIds: ans ? [ans] : [], openAnswer: null };
                    } else if (q.type === "MULTIPLE_CHOICE") {
                        return { questionId: q.id, selectedOptionIds: ans || [], openAnswer: null };
                    }
                }),
            };

            console.log("Payload për backend:", payload);

            await axios.post(
                "http://localhost:8080/api/user/responses",
                payload,
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            addAlert("success", "Dërgesë e suksesshme", "Përgjigjet u ruajtën me sukses!");
            setAnswers({});
        } catch (err) {
            const data = err.response?.data;
            if (Array.isArray(data)) data.forEach(msg => addAlert("error", "Gabim", msg));
            else if (Array.isArray(data?.errors)) data.errors.forEach(msg => addAlert("error", "Gabim", msg.message || msg));
            else if (data?.message) addAlert("error", "Gabim", data.message);
            else addAlert("error", "Gabim", "Ndodhi një gabim gjatë dërgimit të përgjigjeve.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <AlertContainer alerts={alerts} onClose={removeAlert} />

            <section className="login-page services-style1" style={{ paddingTop: "50px" }}>
                {/* Shapes */}
                <div className="shape1"></div>
                <div className="shape2 rotate-me">
                    <img src="/assets/images/shapes/services-v1-shape1.png" alt="#" />
                </div>
                <div className="shape3 float-bob-y">
                    <img src="/assets/images/shapes/services-v1-shape2.png" alt="#" />
                </div>
                <div className="testimonials-style1--style2-shape1">
                    <img src="/assets/images/backgrounds/testimonials-v2-bg.png" alt="#" />
                </div>

                <div className="auto-container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-9 col-md-11">
                            <div className="contact-page__form add-comment-box" style={{ marginTop: "0" }}>
                                <div className="inner-title" style={{ display: "flex", alignItems: "center", gap: "20px", paddingBottom: "30px" }}>
                                    <div style={{ flex: 1, textAlign: "left" }}>
                                        <h2>{survey.title}</h2>
                                        <p style={{ paddingTop: "15px", marginBottom: "0" }}>{survey.description}</p>
                                    </div>
                                    {survey.imageUrl && (
                                        <div style={{ flex: 1, textAlign: "right" }}>
                                            <img src={'http://localhost:8080' + survey.imageUrl} alt={survey.title} style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
                                        </div>
                                    )}
                                </div>

                                <form id="contact-form" className="default-form2" onSubmit={handleSubmit}>
                                    {survey.questions.map((q) => (
                                        <div className="row" key={q.id} style={{ marginBottom: "20px" }}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="mb-2">
                                                        <strong>{q.text}</strong>
                                                    </label>

                                                    {/* SINGLE_CHOICE */}
                                                    {q.type === "SINGLE_CHOICE" && (
                                                        <div className="options-grid">
                                                            {q.options.map((opt) => (
                                                                <div key={opt.id}>
                                                                    <input
                                                                        type="radio"
                                                                        id={`option-${opt.id}`}
                                                                        name={`question-${q.id}`}
                                                                        value={opt.id}
                                                                        checked={answers[q.id] === opt.id}
                                                                        onChange={() => handleChange(q.id, opt.id)}
                                                                    />
                                                                    <label htmlFor={`option-${opt.id}`} className="custom-option">{opt.text}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* MULTIPLE_CHOICE */}
                                                    {q.type === "MULTIPLE_CHOICE" && (
                                                        <div className="options-grid">
                                                            {q.options.map((opt) => (
                                                                <div key={opt.id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`option-${opt.id}`}
                                                                        name={`question-${q.id}`}
                                                                        value={opt.id}
                                                                        checked={answers[q.id]?.includes(opt.id) || false}
                                                                        onChange={(e) => handleCheckboxChange(q.id, opt.id, e.target.checked)}
                                                                    />
                                                                    <label htmlFor={`option-${opt.id}`} className="custom-option">{opt.text}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* TEXT */}
                                                    {q.type === "OPEN_TEXT" && (
                                                        <div className="input-box">
                                                            <textarea
                                                                rows="3"
                                                                placeholder="Shkruani përgjigjen tuaj"
                                                                value={answers[q.id] || ""}
                                                                onChange={(e) => handleChange(q.id, e.target.value)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="button-box text-center">
                                                <button
                                                    className="btn-one"
                                                    type="submit"
                                                    data-loading-text="Ju lutemi prisni..."
                                                    disabled={loading}
                                                >
                                                    <span className="txt">Dërgo përgjigjet</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
