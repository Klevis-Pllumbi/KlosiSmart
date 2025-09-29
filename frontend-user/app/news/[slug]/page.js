"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Newsletter from "@/components/sections/home2/Newsletter";

// Helper: absolute URL for media served as /api/guest/files/news/<file>
function asAbs(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:8080${url}`;
}

export default function NewsDetailsPage() {
    const pathname = usePathname();
    const slug = React.useMemo(() => {
        const parts = pathname?.split("/").filter(Boolean) || [];
        return parts[parts.length - 1] || "";
    }, [pathname]);

    const [news, setNews] = useState(null);
    const [latestNews, setLatestNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function fetchAll() {
            setLoading(true);
            setError(null);
            try {
                const [detailRes, latestRes] = await Promise.all([
                    axios.get(`http://localhost:8080/api/guest/news/${slug}`),
                    axios.get(`http://localhost:8080/api/guest/news?page=0&size=3`),
                ]);
                if (!mounted) return;
                setNews(detailRes.data);
                setLatestNews(latestRes.data?.content || []);
            } catch (e) {
                if (!mounted) return;
                setError(e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së lajmit.");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        if (slug) fetchAll();
        return () => { mounted = false; };
    }, [slug]);

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={news?.title ?? 'Detajet e lajmit'}>
            <div>
                {/*Start Blog Details */}
                <section className="blog-details">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Blog Details Content */}
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-details__content">
                                    {loading && <div className="alert alert-info">Duke ngarkuar…</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {!loading && !error && !news && (
                                        <div className="alert alert-warning">Lajmi nuk u gjet.</div>
                                    )}

                                    {!loading && !error && news && (
                                        <>
                                            {/* Title on top */}
                                            <div className="blog-details-text-box1">
                                                <h2 style={{ marginBottom: 16 }}>{news.title}</h2>
                                            </div>

                                            {/* Main image */}
                                            <div className="blog-details-img-box1" style={{ marginBottom: 24 }}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="blog-details-img-box1__single">
                                                            <img
                                                                src={news.mainImageUrl ? asAbs(news.mainImageUrl) : "/assets/images/blog/blog-details-img1.jpg"}
                                                                alt={news.title}
                                                                style={{ width: "100%", height: 420, objectFit: "cover" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            {news.summary && (
                                                <div className="blog-details-text-box1">
                                                    <p className="text1">{news.summary}</p>
                                                </div>
                                            )}

                                            {/* Gallery images (other images) */}
                                            {Array.isArray(news.imageUrls) && news.imageUrls.length > 0 && (
                                                <div className="blog-details-img-box1">
                                                    <div className="row">
                                                        {news.imageUrls.map((u, idx) => (
                                                            <div className="col-xl-6 col-lg-6 col-md-6" key={idx}>
                                                                <div className="blog-details-img-box1__single">
                                                                    <img
                                                                        src={asAbs(u)}
                                                                        alt={`img-${idx}`}
                                                                        style={{ width: "100%", height: 280, objectFit: "cover" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Content (HTML from Quill) */}
                                            {news.content && (
                                                <div className="blog-details-text-box2">
                                                    <div className="title">
                                                        <h2>Përmbajtja</h2>
                                                    </div>
                                                    <div dangerouslySetInnerHTML={{ __html: news.content }} />
                                                </div>
                                            )}

                                            {/* Documents to Download */}
                                            {Array.isArray(news.documentUrls) && news.documentUrls.length > 0 && (
                                                <div className="departments-details__content-button" style={{ marginTop: 24 }}>
                                                    <div className="title">
                                                        <h2>Shkarko dokumente</h2>
                                                    </div>

                                                    {news.documentUrls.map((doc, i) => {
                                                        const abs = asAbs(doc);
                                                        const fileName = abs.split("/").pop();
                                                        return (
                                                            <div className="departments-details__content-button-single" key={i}>
                                                                <div className="left">
                                                                    <div className="icon-box">
                                                                        <span className="icon-pdf"></span>
                                                                    </div>
                                                                    <div className="text-box">
                                                                        <h4>{fileName}</h4>
                                                                        {/* opsionale: nëse do madhësinë e file-it, duhet HEAD request ose të vijë nga backend */}
                                                                        {/* <p>Pdf(160kb)</p> */}
                                                                    </div>
                                                                </div>
                                                                <div className="right">
                                                                    <div className="button-box">
                                                                        <Link href={abs} target="_blank" rel="noreferrer" download>
                                                                            Shkarko
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {/*End Blog Details Content */}

                            {/*Start Thm Sidebar Box */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="thm-sidebar-box">
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Lajmet e fundit</h3>
                                        </div>
                                        <div className="sidebar-blog-post">
                                            <ul className="blog-post">
                                                {latestNews.map((n) => (
                                                    <li key={n.id}>
                                                        <div className="inner">
                                                            <div className="img-box">
                                                                <img
                                                                    src={n.mainImageUrl ? asAbs(n.mainImageUrl) : "/assets/images/sidebar/blog-post-img1.jpg"}
                                                                    alt={n.title}
                                                                    style={{ width: "100%", height: 90, objectFit: "cover" }}
                                                                />
                                                                <div className="overlay-content">
                                                                    <Link href={`/news/${n.slug}`}><i className="fa fa-link" aria-hidden="true"></i></Link>
                                                                </div>
                                                            </div>
                                                            <div className="title-box">
                                                                <h4><Link href={`/news/${n.slug}`}>{n.title}</Link></h4>
                                                                <p><span className="icon-calendar-1"></span> {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Thm Sidebar Box */}
                        </div>
                    </div>
                </section>
                {/*End Blog Details */}

                <Newsletter />
            </div>
        </Layout>
    );
}
