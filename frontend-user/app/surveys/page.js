"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Newsletter from "@/components/sections/home2/Newsletter";
import Preloader from "@/components/elements/Preloader";

export default function SurveysList() {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/user/surveys/active",
            {withCredentials: true}
            )
            .then(res => setSurveys(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Preloader />;

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Jepni opinionin tuaj">
            <section className="events-style1 events-style1--events1">
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title"><h6>Pyetësor</h6></div>
                        <h2>Jepni opinionin tuaj <br />dhe bashkohuni me ne për çështjet e qytetit</h2>
                    </div>
                    <div className="row">
                        {surveys.map(survey => (
                            <div className="col-xl-12" key={survey.id}>
                                <div className="events-style1__single">
                                    <div className="events-style1__single-left">
                                        <div className="img-box">
                                            <img
                                                src={survey.imageUrl ? `http://localhost:8080${survey.imageUrl}` : 'assets/images/default-survey.jpg'}
                                                alt={survey.title}
                                                style={{
                                                    width: '250px',
                                                    height: '180px',
                                                    display: 'block',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                        <div className="title">
                                            <h2>
                                            <Link href={`/surveys/${survey.id}`}>
                                                    {survey.title}
                                                </Link>
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="events-style1__single__right">
                                        <ul className="contact-info">
                                            <li>
                                                <div className="text"><p>E vlefshme deri më</p></div>
                                            </li>
                                            <li>
                                                <div className="icon"><span className="icon-wall-clock"></span></div>
                                                <div className="text">
                                                    <p>{new Date(survey.endDate).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                    })}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="events-style1__single__right-btn">
                                            <Link className="btn-one" href={`/surveys/${survey.id}`}>
                                                <span className="txt">Plotëso</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Newsletter />
        </Layout>
    );
}
