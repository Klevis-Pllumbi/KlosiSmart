"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

function asAbs(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:8080${url}`;
}

export default function News() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get("http://localhost:8080/api/guest/news?page=0&size=3");
                if (!mounted) return;
                setItems(res.data?.content || []);
            } catch (e) {
                if (!mounted) return;
                setError(e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së lajmeve.");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    return (
        <>
            {/*Start Blog Style1 */}
            <section className="blog-style1">
                <div className="shape1"><img src="/assets/images/shapes/blog-v1-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>LAJME</h6>
                        </div>
                        <h2>Njihuni me lajmet më të fundit nga <br /> media jonë</h2>
                    </div>

                    {loading && (
                        <div className="alert alert-info text-center">Duke ngarkuar…</div>
                    )}
                    {error && (
                        <div className="alert alert-danger text-center">{error}</div>
                    )}

                    <div className="row">
                        {!loading && !error && items.map((n, i) => (
                            <div key={n.id} className={`col-xl-4 col-lg-4 wow ${i % 2 === 0 ? "fadeInUp" : "fadeInDown"}`} data-wow-delay=".3s">
                                <div className="blog-style1__single">
                                    <div className="blog-style1__single-img">
                                        <Link href={`/news/${n.slug}`}>
                                            <img
                                                src={n.mainImageUrl ? asAbs(n.mainImageUrl) : "assets/images/blog/blog-v1-1.jpg"}
                                                alt={n.title}
                                                style={{ width: "100%", height: 260, objectFit: "cover" }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="blog-style1__single-content">
                                        <div className="date-box">
                                            <p><span className="icon-calendar"></span> {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}</p>
                                        </div>
                                        <h2>
                                            <Link href={`/news/${n.slug}`}>{n.title}</Link>
                                        </h2>
                                        <div className="text">
                                            <p style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}>{n.summary}</p>
                                        </div>
                                        <div className="blog-style1__single-conten-btn">
                                            <Link className="btn-one" href={`/news/${n.slug}`}>
                                                <span className="txt">Lexo më shumë</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Link te faqja e dedikuar e lajmeve */}
                    <div className="text-center" style={{ marginTop: 24 }}>
                        <Link className="btn-one" href="/news">
                            <span className="txt">Shiko të gjitha lajmet</span>
                        </Link>
                    </div>
                </div>
            </section>
            {/*End Blog Style1 */}
        </>
    );
}